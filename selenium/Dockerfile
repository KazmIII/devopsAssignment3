FROM python:3.9-slim
WORKDIR /tests

RUN apt update && apt install -y wget unzip \
    && wget -q https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb \
    && apt install -y ./google-chrome-stable_current_amd64.deb \
    && wget -q https://chromedriver.storage.googleapis.com/`curl -sS chromedriver.storage.googleapis.com/LATEST_RELEASE`/chromedriver_linux64.zip \
    && unzip chromedriver_linux64.zip -d /usr/local/bin \
    && chmod +x /usr/local/bin/chromedriver

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
CMD ["pytest", "--maxfail=1", "--disable-warnings", "-q"]
