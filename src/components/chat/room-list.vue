<script setup lang="ts">
import { ref, nextTick, watchEffect } from 'vue'
import { formatDate, replaceFileAttachments } from '@/lib/utils'
import { useChatStore } from '@/stores/chat'

const emit = defineEmits(['selectRoom'])
const chatStore = useChatStore()
const roomListRef = ref<HTMLElement>()

const scrollToActiveRoom = async () => {
  await nextTick()
  if (!roomListRef.value || !chatStore.currentRoomId) return

  const activeRoomElement = roomListRef.value.querySelector(
    `[data-room-id="${chatStore.currentRoomId}"]`,
  )
  if (activeRoomElement) {
    activeRoomElement.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
  }
}

watchEffect(() => {
  if (chatStore.currentRoomId) {
    scrollToActiveRoom()
  }
})
</script>

<template>
  <ul ref="roomListRef" class="flex-1 space-y-0.5 overflow-y-auto p-0.5">
    <li v-for="room in chatStore.rooms" :key="room.room_id" class="border-b border-b-slate-100">
      <button
        :data-room-id="room.room_id"
        :class="[
          'flex w-full cursor-pointer items-center border-l-4 py-4 pr-4 pl-3 text-start transition-colors hover:bg-slate-50 focus:ring-1 focus:ring-slate-300 focus:outline-none',
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
    </li>
  </ul>
</template>
