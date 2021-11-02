# frozen_string_literal: true

require 'dotenv'
require 'sinatra'
require 'fintoc'
require 'httparty'
Dotenv.load

set :port, 5000
set :protection, :except => [:json_csrf]

link_token = ''

fintoc = Fintoc::Client.new(ENV['SECRET_KEY'])

get '/api/accounts' do
  link = fintoc.get_link(link_token)
  accounts = link.find_all(type: 'checking_account')
  content_type :json
  accounts.map do |account|
    { balance: { available: account.balance.available, current: account.balance.current },
      id: account.id,
      name: account.name,
      holderName: account.holder_name,
      currency: account.currency }
  end.to_json
end

get '/api/accounts/:account_id/movements' do
  start_of_month = Date.new(Date.today.year, Date.today.month, 1)
  link = fintoc.get_link(link_token)
  account = link.find(id: params[:account_id])

  content_type :json
  last_month_movements = account.get_movements(since: start_of_month.to_s)
  last_month_movements.to_a.map do |movement|
    { id: movement.id,
      postDate: movement.post_date,
      currency: movement.currency,
      amount: movement.amount,
      description: movement.description }
  end.to_json
end

get '/api/invoices' do
  last_month = Date.new(Date.today.year, Date.today.month - 1, 1)
  url = 'https://api.fintoc.com/v1/invoices'
  headers = { Authorization: ENV['SECRET_KEY'] }
  content_type :json
  response = HTTParty.get(
    url,
    query: { since: last_month, link_token: link_token },
    headers: headers
  )
  response.body.to_json
end

post '/api/link_token' do
  request.body.rewind
  link_token = (JSON.parse request.body.read)['data']['link_token']
  'Post request to /api/link_token'
end
