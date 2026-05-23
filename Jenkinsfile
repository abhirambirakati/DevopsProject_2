pipeline {
    agent any
    environment {
        REGISTRY = "ghcr.io/${env.GITHUB_REPOSITORY_OWNER}/backend"
        IMAGE_TAG = "${env.GIT_COMMIT}" 
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build Frontend') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }
        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh 'mvn -B clean package -DskipTests'
                }
            }
        }
        stage('Docker Build') {
            steps {
                sh 'docker build -t ${REGISTRY}:${IMAGE_TAG} -f backend/Dockerfile .'
            }
        }
        stage('Docker Push') {
            when {
                branch 'main'
            }
            steps {
                withCredentials([usernamePassword(credentialsId: 'github-token', usernameVariable: 'USER', passwordVariable: 'TOKEN')]) {
                    sh "docker login ghcr.io -u $USER -p $TOKEN"
                    sh "docker push ${REGISTRY}:${IMAGE_TAG}"
                }
            }
        }
        stage('Deploy') {
            steps {
                // Placeholder: add deployment commands (e.g., kubectl, docker run, etc.)
                echo "Deploy step - customize for your environment"
            }
        }
    }
    post {
        always {
            cleanWs()
        }
    }
}
