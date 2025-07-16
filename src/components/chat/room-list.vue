<script setup lang="ts">
import { formatDate, replaceFileAttachments } from '@/lib/utils'
import { useChatStore } from '@/stores/chat'

const chatStore = useChatStore()
const emit = defineEmits(['selectRoom'])
</script>

<template>
  <button
    v-for="room in chatStore.rooms"
    :key="room.room_id"
    :class="[
      'flex w-full cursor-pointer items-center border-b border-l-4 border-b-slate-100 py-4 pr-4 pl-3 text-start hover:bg-slate-50',
      {
        'border-l-transparent': room.room_id !== chatStore.currentRoomId,
        'border-l-blue-500 bg-blue-50': room.room_id === chatStore.currentRoomId,
      },
    ]"
    @click="emit('selectRoom', room.room_id)"
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
  </button>
</template>
