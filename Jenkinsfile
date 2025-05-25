pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "saniakazmii/mern-message-board"
        DOCKER_TAG = "latest"
        SELENIUM_IMAGE = "selenium-tests"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git url: 'https://github.com/KazmIII/devopsAssignment3.git', branch: 'main'
            }
        }

        stage('Lint Frontend and Backend') {
            steps {
                dir('client') {
                    sh 'npm install'
                    sh 'npx eslint src/**/*.js || true'
                }
                dir('server') {
                    sh 'npm install'
                    sh 'npx eslint . || true'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    dockerImage = docker.build("${DOCKER_IMAGE}:${DOCKER_TAG}")
                }
            }
        }

        stage('Run Backend Unit Tests') {
            steps {
                dir('server') {
                    sh 'npm test'
                }
            }
        }

        stage('Deploy Container') {
            steps {
                sh '''
                    docker stop mern-app || true
                    docker rm mern-app || true
                    docker run -d -p 3000:3000 --name mern-app ${DOCKER_IMAGE}:${DOCKER_TAG}
                '''
            }
        }

        stage('Run Selenium Tests') {
            steps {
                dir('selenium') {
                    script {
                        def seleniumImage = docker.build("${SELENIUM_IMAGE}")
                        seleniumImage.run('--rm')
                    }
                }
            }
        }
    }

    post {
        success {
            echo "✅ CI/CD Pipeline executed successfully!"
        }
        failure {
            echo "❌ CI/CD Pipeline failed!"
        }
    }
}
