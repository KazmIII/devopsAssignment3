pipeline {
    agent any

    environment {
        DOCKER_IMAGE     = "saniakazmii/mern-message-board"
        DOCKER_TAG       = "latest"
        SELENIUM_IMAGE   = "selenium-tests"
    }

    options {
        // keep logs for 30 days
        buildDiscarder(logRotator(daysToKeepStr: '30'))
        // timeout if pipeline hangs
        timeout(time: 45, unit: 'MINUTES')
    }

    stages {
        stage('Checkout') {
            steps {
                // Grab your repo
                checkout([
                  $class: 'GitSCM',
                  branches: [[name: '*/main']],
                  userRemoteConfigs: [[
                    url: 'https://github.com/KazmIII/devopsAssignment3.git',
                    credentialsId: 'dockerhub-creds'
                  ]]
                ])
            }
        }

        stage('Parallel Lint & Unit Tests') {
            parallel {
                stage('Client: Install & Lint') {
                    steps {
                        // Cache node_modules per-branch
                        cache(path: 'client/node_modules', key: "client-npm-${env.BRANCH_NAME}") {
                            dir('client') {
                                sh 'npm ci --prefer-offline'
                            }
                        }
                        dir('client') {
                            sh 'npx eslint src/**/*.js || true'
                        }
                    }
                }
                stage('Server: Install & Test') {
                    steps {
                        cache(path: 'server/node_modules', key: "server-npm-${env.BRANCH_NAME}") {
                            dir('server') {
                                sh 'npm ci --prefer-offline'
                            }
                        }
                        dir('server') {
                            sh 'npm test'
                        }
                    }
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    // Build MERN app (Dockerfile uses multi-stage, so it caches deps)
                    dockerImage = docker.build("${DOCKER_IMAGE}:${DOCKER_TAG}", "--pull .")

                    // Build Selenium test image
                    seleniumImage = docker.build("${SELENIUM_IMAGE}", "selenium")
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

        stage('Selenium Tests') {
            steps {
                // run your Selenium Mocha suite
                script {
                    seleniumImage.inside('--network host') {
                        sh 'npm test'
                    }
                }
            }
        }
    }

    post {
        success {
            echo "✅ Pipeline completed successfully!"
        }
        failure {
            echo "❌ Pipeline failed! Check the console output."
        }
        cleanup {
            // always clean up dangling containers
            sh 'docker-compose down --rmi local || true'
        }
    }
}
