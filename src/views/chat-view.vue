<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useChatStore } from '@/stores/chat'
import RoomList from '@/components/chat/room-list.vue'
import RoomChat from '@/components/chat/room-chat.vue'

const route = useRoute()
const router = useRouter()
const chatStore = useChatStore()

function selectRoom(roomId: string) {
  chatStore.setCurrentRoom(roomId)
  if (route.params.roomId !== roomId) {
    router.push({ name: 'chatRoom', params: { roomId } })
  }
}

onMounted(() => {
  chatStore.loadRooms()

  const roomId = route.params.roomId as string
  if (roomId) {
    selectRoom(roomId)
  }
})

watch(
  () => route.params.roomId,
  (newRoomId) => {
    if (newRoomId && typeof newRoomId === 'string') {
      selectRoom(newRoomId)
    }
  },
)
</script>

<template>
  <div class="flex h-full w-full">
    <div class="flex w-1/3 flex-col border-r border-slate-200 bg-white">
      <div class="border-b border-slate-200 p-4">
        <h2 class="text-xl font-semibold text-slate-800">Chat Rooms</h2>
      </div>
      <div class="flex-1 overflow-y-auto">
        <RoomList @select-room="selectRoom" />
      </div>
    </div>

    <div v-if="!chatStore.currentRoom" class="flex flex-1 flex-col">
      <div class="flex flex-1 items-center justify-center">
        <div class="text-center">
          <h3 class="mb-2 text-xl font-semibold text-slate-900">Welcome to Chat</h3>
          <p class="text-slate-500">Select a room to start chatting</p>
        </div>
      </div>
    </div>
    <div v-else class="flex flex-1 flex-col">
      <RoomChat />
    </div>
  </div>
</template>
