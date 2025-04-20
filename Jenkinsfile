pipeline {
  agent any

  tools {
    nodejs 'Node18'
  }

  parameters {
    choice(name: 'TAGS', choices: ['@smoke', '@regression', '@e2e'], description: 'Choose test tag to run')
  }

  environment {
    API_BASE_URL = 'https://reqres.in/'
  }

  stages {
    stage('Install Dependencies') {
      steps {
        echo 'Installing dependencies...'
        sh 'npm ci'
      }
    }

    stage('Run Playwright API Tests') {
      environment {
        TOKEN = credentials('your-secret-token-id') // ✅ Use secret from Jenkins
      }
      steps {
        echo "Running tests tagged with: ${params.TAGS}"
        sh 'mkdir -p results'
        sh "npx playwright test --grep \"${params.TAGS}\" --project=API || true"
      }
    }
  }

  post {
    always {
      echo 'Pipeline finished.'
      junit 'results/test-results.xml'
      archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
    }
  }
}
