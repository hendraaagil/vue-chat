<script setup lang="ts">
import { formatDate, replaceFileAttachments } from '@/lib/utils'
import { useChatStore } from '@/stores/chat'

const chatStore = useChatStore()
</script>

<template>
  <div
    v-for="room in chatStore.rooms"
    :key="room.room_id"
    :class="['flex cursor-pointer items-center border-b border-slate-100 p-4 hover:bg-slate-50']"
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
</template>
