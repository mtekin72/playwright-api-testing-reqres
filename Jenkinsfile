pipeline {
  agent any

  parameters {
    choice(
      name: 'TEST_TAG',
      choices: ['@smoke', '@regression', '@e2e'],
      description: 'Select test tag to run'
    )
  }

  environment {
    PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD = "1"
  }

  stages {
    stage('Install') {
      steps {
        sh 'npm ci'
        sh 'npx playwright install --with-deps'
      }
    }

    stage('Run Tests') {
      steps {
        sh "npx playwright test --grep ${params.TEST_TAG}"
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'playwright-report/**/*.*', allowEmptyArchive: true
    }
  }
}
