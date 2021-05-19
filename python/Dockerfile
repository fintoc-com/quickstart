ARG PYTHON_VER=3.6.1
FROM python:${PYTHON_VER}

WORKDIR /opt/app

COPY . .

RUN pip3 install -r requirements.txt

EXPOSE 5000

ENV FLASK_APP=/opt/app/python/app.py

ENTRYPOINT ["python"]
CMD ["-m", "flask", "run", "--host=0.0.0.0", "--port=5000"]