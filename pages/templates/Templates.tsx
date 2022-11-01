import axios from '@/lib/axios'
import { Table, Modal, Button, message } from 'antd'
import { useState } from 'react'
import { dehydrate, useQuery, QueryClient } from 'react-query'

const fetchProduct = async () => {
  const templates = await axios.get('http://localhost:4000/api/templates')

  return templates.data
}

export const getServerSideProps = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery('templates', () => fetchProduct())

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}

const columns = [
  {
    title: 'Name',
    dataIndex: 'template_name',
    key: 'template_name'
  },
  {
    title: 'Img Path',
    dataIndex: 'template_img',
    key: 'template_img'
  },
  {
    title: 'Keywords',
    dataIndex: 'template_keywords',
    key: 'template_keywords'
  },
  {
    title: 'Description',
    dataIndex: 'template_description',
    key: 'template_description'
  }
]

const Templates = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { data, isLoading, isError, refetch } = useQuery('templates', () => fetchProduct())
  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setIsModalOpen(true)
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

export default Templates
