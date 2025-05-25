pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-creds')
        DOCKER_IMAGE = 'saniakazmii/mern-message-board'
        DOCKER_TAG = 'latest'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/KazmIII/devopsAssignment3.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    dockerImage = docker.build("${DOCKER_IMAGE}:${DOCKER_TAG}")
                }
            }
        }

        stage('Run Tests') {
            steps {
                sh 'docker run ${DOCKER_IMAGE}:${DOCKER_TAG} npm test'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'dockerhub-creds') {
                        dockerImage.push()
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    docker stop mern-app || true
                    docker rm mern-app || true
                    docker run -d -p 3000:3000 --name mern-app ${DOCKER_IMAGE}:${DOCKER_TAG}
                '''
            }
        }
    }

    post {
        success {
            slackSend channel: '#deployments',
                      message: "Deployment Successful: ${env.BUILD_URL}"
        }
        failure {
            slackSend channel: '#deployments',
                      message: "Deployment Failed: ${env.BUILD_URL}"
        }
    }
}
