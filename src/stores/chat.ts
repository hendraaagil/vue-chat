import type { ChatMessage, CustomerRoom, CustomerRoomData } from '@/types/chat'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import listRooms from '@/data/list_rooms.json'
import messageData from '@/data/messages.json'

export const useChatStore = defineStore('chat', () => {
  const rooms = ref<CustomerRoom[]>([])
  const messages = ref<ChatMessage[]>([])
  const currentRoomId = ref<string | null>(null)

  const currentRoom = computed(() => {
    return rooms.value.find((room) => room.room_id === currentRoomId.value)
  })

  function loadRooms() {
    const data = listRooms as CustomerRoomData
    rooms.value = data.data.customer_rooms
  }

  function loadMessages(roomId: string) {
    const isEven = parseInt(roomId, 10) % 2 === 0
    messages.value = isEven ? (messageData[0] as ChatMessage[]) : (messageData[1] as ChatMessage[])
  }

  function setCurrentRoom(roomId: string) {
    currentRoomId.value = roomId
    loadMessages(roomId)
  }

  return {
    rooms,
    messages,
    currentRoomId,
    currentRoom,
    loadRooms,
    loadMessages,
    setCurrentRoom,
  }
})
