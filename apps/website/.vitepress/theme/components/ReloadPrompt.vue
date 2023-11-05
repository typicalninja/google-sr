<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'

  const offlineReady = ref(false)
  const needRefresh = ref(false)

  let updateServiceWorker: (() => Promise<void>) | undefined

  const onOfflineReady = () => {
      offlineReady.value = true
  }
  const onNeedRefresh = () => {
      needRefresh.value = true
  }
  const close = async () => {
      offlineReady.value = false
      needRefresh.value = false
  }

  onBeforeMount(async () => {
    // @ts-ignore 
      const { registerSW } = await import('virtual:pwa-register')
      updateServiceWorker = registerSW({
          immediate: true,
          onOfflineReady,
          onNeedRefresh,
          onRegistered() {
              console.info('Service Worker registered, app is available offline')
          },
          onRegisterError(e: Error) {
              console.error('Service Worker registration error!', e)
          },
      })
  })
</script>

<template>
    <template v-if="offlineReady || needRefresh">
        <div class="pwa-toast" role="alertdialog" aria-labelledby="pwa-message">
            <div id="pwa-message" class="mb-3">
                {{ offlineReady ? 'App is ready to work offline.' : 'New content available, click the reload button to update.'
                }}
            </div>
            <button v-if="needRefresh" type="button" class="pwa-refresh" @click="updateServiceWorker?.()">
                Reload
            </button>
            <button type="button" class="pwa-cancel" @click="close">
                Close
            </button>
        </div>
    </template>
</template>

<style>
  .pwa-toast {
      position: fixed;
      right: 0;
      bottom: 0;
      margin: 16px;
      padding: 12px;
      border: 1px solid var(--vp-c-border);
      border-radius: 0.5rem;
      z-index: var(--vp-z-index-sidebar);
      text-align: left;
      background-color: var(--vp-c-bg-elv);
      color: var(--vp-c-text-1)
  }

  .pwa-toast #pwa-message {
      margin-bottom: 8px;
  }

  .pwa-toast button {
      border: 2px solid var(--vp-button-brand-border);
      outline: none;
      margin-right: 5px;
      border-radius: 0.375rem;
      padding: 3px 10px;
      background-color: var(--vp-button-brand-bg);
      color: var(--vp-button-brand-text);
  }

  .pwa-toast button:hover {
    border: 2px solid var(--vp-button-brand-hover-border);
    color: var(--vp-button-brand-hover-text);
    background-color: var(--vp-button-brand-hover-bg);
  }
</style>