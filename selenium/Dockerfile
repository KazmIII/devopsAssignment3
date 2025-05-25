FROM python:3.11-slim
WORKDIR /tests
COPY . .
RUN pip install selenium
CMD ["pytest", "."]
