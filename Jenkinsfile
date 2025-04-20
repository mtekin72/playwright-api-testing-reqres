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

    // If you have set this as a secret text in Jenkins credentials, keep it like this:
    // TOKEN = credentials('reqres-api-token')

    // Otherwise, fallback to hardcoded token (NOT recommended for real projects):
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
        sh "npx playwright test --grep \"${params.TAGS}\" --project=API || true"
      }
    }
  }

  post {
    always {
      echo 'Pipeline finished.'
      // Add this if you want HTML report later:
      // archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
    }
  }
}
