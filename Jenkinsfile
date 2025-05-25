pipeline {
  agent any

  environment {
    APP_IMAGE     = "saniakazmii/mern-message-board:latest"
    SELENIUM_IMAGE= "selenium-tests:latest"
  }

    stages {
        stage('Checkout Code') {
            steps {
                git url: 'https://github.com/KazmIII/devopsAssignment3.git', branch: 'main'
            }
        }

        stage('Code Linting') {
            steps {
                dir('client') {
                    sh 'npm install'
                    sh 'npx eslint src/**/*.js || true'
                }
            }
        }
      }
    }

    stage('Build & Push App Image') {
      steps {
        script {
          docker.build(APP_IMAGE)
        }
      }
    }

    stage('Unit Tests (Server)') {
      steps {
        dir('server') { sh 'npm test' }
      }
    }

    stage('Deploy MERN Container') {
      steps {
        sh '''
          docker stop mern-app || true
          docker rm mern-app  || true
          docker run -d --name mern-app -p 3000:3000 ${APP_IMAGE}
        '''
      }
    }

    stage('Selenium Tests') {
      steps {
        dir('selenium') {
          script {
            docker.build(SELENIUM_IMAGE)
            docker.image(SELENIUM_IMAGE).run('--network host --rm')
          }
        }
      }
    }
  }

  post {
    success { echo "✅ Pipeline succeeded!" }
    failure { echo "❌ Pipeline failed!" }
  }
}
