<script setup lang="ts">
import { onMounted } from 'vue'

import { formatDate, replaceFileAttachments } from '@/lib/utils'
import { useChatStore } from '@/stores/chat'

const chatStore = useChatStore()

onMounted(() => {
  chatStore.loadRooms()
})
</script>

<template>
  <div class="flex h-full w-full">
    <div class="flex w-1/3 flex-col border-r border-slate-200 bg-white">
      <div class="border-b border-slate-200 p-4">
        <h2 class="text-xl font-semibold text-slate-800">Chat Rooms</h2>
      </div>

      <div class="flex-1 overflow-y-auto">
        <div>
          <div
            v-for="room in chatStore.rooms"
            :key="room.room_id"
            :class="[
              'flex cursor-pointer items-center border-b border-slate-100 p-4 hover:bg-slate-50',
            ]"
          >
            <img
              :src="room.user_avatar_url"
              :alt="room.name"
              class="mr-3 h-10 w-10 rounded-full"
              onerror="this.src='/chat.png'"
            />
            <div class="min-w-0 flex-1">
              <div class="flex items-center justify-between">
                <h3 class="truncate text-sm font-medium text-slate-900">
                  {{ room.name }}
                </h3>
                <span class="text-xs text-slate-500">
                  {{ formatDate(room.last_comment_timestamp) }}
                </span>
              </div>
              <p class="truncate text-sm text-slate-500">
                {{ replaceFileAttachments(room.last_comment_text) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-1 flex-col">
      <div class="flex flex-1 items-center justify-center">
        <div class="text-center">
          <h3 class="mb-2 text-xl font-semibold text-slate-900">Welcome to Chat</h3>
          <p class="text-slate-500">Select a room to start chatting</p>
        </div>
      </div>
    </div>
  </div>
</template>
