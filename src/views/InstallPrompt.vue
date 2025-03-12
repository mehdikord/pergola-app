<template>
  <div v-if="showInstallButton" class="install-prompt">
    <div class="install-content">
      <p>📱 برنامه ما را نصب کنید تا تجربه بهتری داشته باشید!</p>
      <button @click="installApp">نصب برنامه</button>
      <button @click="dismissPrompt">بعداً</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InstallPrompt',
  data() {
    return {
      deferredPrompt: null,
      showInstallButton: false,
      isIos: false
    }
  },
  mounted() {
    // اگر کاربر قبلاً پیام را رد کرده باشد نمایش نده
    if (this.shouldShowPrompt()) {
      window.addEventListener('beforeinstallprompt', this.handleInstallPrompt)
      this.detectIos()
    }
  },
  methods: {
    shouldShowPrompt() {
      return localStorage.getItem('installPrompt') !== 'dismissed'
    },

    handleInstallPrompt(e) {
      e.preventDefault()
      this.deferredPrompt = e
      this.showInstallButton = true
    },

    detectIos() {
      this.isIos = /iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase())
      const isInStandaloneMode = 'standalone' in navigator && navigator.standalone

      if (this.isIos && !isInStandaloneMode && this.shouldShowPrompt()) {
        this.showInstallButton = true
      }
    },

    async installApp() {
      if (this.deferredPrompt) {
        try {
          this.deferredPrompt.prompt()
          const { outcome } = await this.deferredPrompt.userChoice
          if (outcome === 'accepted') {
            localStorage.setItem('installPrompt', 'installed')
          }
        } finally {
          this.resetPrompt()
        }
      } else if (this.isIos) {
        alert('برای نصب: 1. دکمه اشتراک‌گذاری (سهم) را بزنید 2. گزینه "Add to Home Screen" را انتخاب کنید')
        this.resetPrompt()
      }
    },

    dismissPrompt() {
      this.resetPrompt()
      localStorage.setItem('installPrompt', 'dismissed')
    },

    resetPrompt() {
      this.showInstallButton = false
      this.deferredPrompt = null
      window.removeEventListener('beforeinstallprompt', this.handleInstallPrompt)
    }
  },
  created() {
    // بررسی اولیه وضعیت localStorage
    if (!this.shouldShowPrompt()) {
      this.showInstallButton = false
    }
  }
}
</script>