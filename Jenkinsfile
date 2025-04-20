pipeline {
  agent any

  tools {
    nodejs 'Node 18'
  }

  parameters {
    choice(name: 'TAGS', choices: ['@smoke', '@regression', '@e2e'], description: 'Choose test tag to run')
  }

  environment {
    API_BASE_URL = 'https://reqres.in/'
    TOKEN = credentials('your-secret-token-id') // Optional, if using Jenkins credentials
  }

  stages {
    stage('Install') {
      steps {
        echo 'Installing dependencies...'
        sh 'npm ci'
      }
    }

    stage('Run Tests') {
      steps {
        echo "Running tests with tag: ${params.TAGS}"
        sh "npx playwright test --grep \"${params.TAGS}\" --project=API"
      }
    }
  }
}
