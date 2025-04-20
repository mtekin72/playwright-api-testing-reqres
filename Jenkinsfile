pipeline {
  agent any

  tools {
    nodejs 'Node18' // ✅ Must match the name defined in Global Tool Configuration
  }

  parameters {
    choice(name: 'TAGS', choices: ['@smoke', '@regression', '@e2e'], description: 'Choose test tag to run')
  }

  environment {
    API_BASE_URL = 'https://reqres.in/'
    TOKEN = 'QpwL5tke4Pnpja7X4'
  }

  stages {
    stage('Install Dependencies') {
      steps {
        echo 'Installing dependencies...'
        sh 'npm ci'
      }
    }

    stage('Run Playwright API Tests') {
      steps {
        echo "Running tests tagged with: ${params.TAGS}"
        sh 'mkdir -p results' // ✅ Make sure result folder exists
        sh "npx playwright test --grep \"${params.TAGS}\" --project=API || true"
      }
    }
  }

  post {
    always {
      echo 'Pipeline finished.'
      // ✅ Publish test results so Blue Ocean shows them per test
      junit 'results/test-results.xml'

      // ✅ Archive HTML report if needed
      archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
    }
  }
}
