import axios from '@/lib/axios'
import { Table, Modal, Button, message } from 'antd'
import { useState } from 'react'
import { dehydrate, useQuery, QueryClient } from 'react-query'

const fetchProduct = async () => {
  const questions = await axios.get('http://localhost:4000/api/questions')

  return questions.data
}

export const getServerSideProps = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery('questions', () => fetchProduct())

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}

const columns = [
  {
    title: 'Question type',
    dataIndex: 'question_type',
    key: 'question_type'
  },
  {
    title: 'Question',
    dataIndex: 'question',
    key: 'question'
  },
  {
    title: 'Website type',
    dataIndex: 'website_type',
    key: 'website_type'
  }
]

const QuestionsList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { data, isLoading, isError, refetch } = useQuery('questions', () => fetchProduct())
  console.log(data)
  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setIsModalOpen(true)
          // message.info('hello')
        }}
      >
        Open modal
      </Button>
      <Table dataSource={data} columns={columns} />
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
