<script setup lang="ts">
import { formatDate } from '@/lib/utils'
import { useChatStore } from '@/stores/chat'

const chatStore = useChatStore()
</script>

<template>
  <div class="border-b border-slate-200 bg-white p-4">
    <div class="flex items-center">
      <img
        :src="chatStore.currentRoom!.user_avatar_url"
        :alt="chatStore.currentRoom!.name"
        class="mr-3 h-8 w-8 rounded-full"
        onerror="this.src='/chat.png'"
      />
      <div>
        <h3 class="text-lg font-medium text-slate-900">
          {{ chatStore.currentRoom!.name }}
        </h3>
        <p class="text-sm text-slate-500">
          {{ chatStore.currentRoom!.source }} ({{ chatStore.currentRoom!.user_id }})
        </p>
      </div>
    </div>
  </div>

  <div class="flex-1 space-y-4 overflow-y-auto p-4">
    <div
      v-for="message in chatStore.messages"
      :key="message.id"
      :class="[
        'flex',
        {
          'justify-center': message.sender_type === 'system',
          'justify-end': message.is_own_message,
          'justify-start': !message.is_own_message && message.sender_type !== 'system',
        },
      ]"
    >
      <div
        :class="[
          'max-w-xs rounded-lg px-4 py-2 lg:max-w-md',
          message.is_own_message ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-900',
        ]"
      >
        <p class="text-sm">{{ message.text }}</p>

        <div v-if="message.product" class="mt-2">
          <div class="rounded-lg bg-white p-3 text-slate-900">
            <img
              :src="message.product.image_url"
              :alt="message.product.name"
              class="mb-2 h-32 w-full rounded-lg object-cover"
            />
            <h4 class="font-medium">{{ message.product.name }}</h4>
            <p class="font-semibold text-green-600">
              {{ message.product.price }}
            </p>
          </div>
        </div>

        <div
          :class="[
            'mt-1.5 flex items-center gap-2',
            {
              'justify-between': message.sender_type !== 'system',
              'justify-center': message.sender_type === 'system',
            },
          ]"
        >
          <span v-if="message.sender_type !== 'system'" class="text-xs opacity-70">
            {{ message.sender }}
          </span>
          <span class="text-xs opacity-70">
            {{ formatDate(message.timestamp) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
