import axios from '@/lib/axios'
import { Table, Modal, Button, message } from 'antd'
import { useState } from 'react'
import { dehydrate, useQuery, QueryClient } from 'react-query'

const fetchProduct = async () => {
  const prodcuts = await axios.get('https://dummyjson.com/products/1')

  return prodcuts.data
}

export const getServerSideProps = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery('product', () => fetchProduct())

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}

const QuestionsList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { data, isLoading, isError, refetch } = useQuery('product', () => fetchProduct())

  // console.log({ data, isLoading })

  return (
    <div>
      <span>{data.title}</span>
      <Button
        type="primary"
        onClick={() => {
          setIsModalOpen(true)
          // message.info('hello')
        }}
      >
        Open modal
      </Button>
      <Table />
      <Modal
        title="Hello"
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false)
        }}
        onOk={() => {
          setIsModalOpen(false)
        }}
      >
        This is a Modal
      </Modal>
    </div>
  )
}

export default QuestionsList
