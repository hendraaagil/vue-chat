import type { CustomerRoom, CustomerRoomData } from '@/types/chat'
import { defineStore } from 'pinia'
import { ref } from 'vue'

import listRooms from '@/data/list_rooms.json'

export const useChatStore = defineStore('chat', () => {
  const rooms = ref<CustomerRoom[]>([])

  function loadRooms() {
    const data = listRooms as CustomerRoomData
    rooms.value = data.data.customer_rooms
  }

  return {
    rooms,
    loadRooms,
  }
})
