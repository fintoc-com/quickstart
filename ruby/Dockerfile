ARG RUBY_VER=2.7.3
FROM ruby:${RUBY_VER}

WORKDIR /opt/app

COPY . .

RUN bundle install

EXPOSE 5000

ENTRYPOINT ["ruby"]
CMD ["app.rb", "-o", "0.0.0.0"]
