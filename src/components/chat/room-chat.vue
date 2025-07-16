<script setup lang="ts">
import { ref } from 'vue'
import { formatDate } from '@/lib/utils'
import { useChatStore } from '@/stores/chat'

const chatStore = useChatStore()
const newMessage = ref('')

function sendMessage() {
  if (newMessage.value.trim()) {
    chatStore.sendMessage(newMessage.value)
    newMessage.value = ''
  }
}
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
          {
            'bg-blue-500 text-white': message.is_own_message,
            'bg-slate-200 text-slate-900': !message.is_own_message,
          },
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

  <div class="border-t border-gray-200 bg-white p-4">
    <form @submit.prevent="sendMessage" class="flex space-x-2">
      <input
        v-model="newMessage"
        type="text"
        placeholder="Type a message..."
        class="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <button
        type="submit"
        :disabled="!newMessage.trim()"
        class="rounded-lg bg-blue-500 px-6 py-2 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-300"
      >
        Send
      </button>
    </form>
  </div>
</template>
