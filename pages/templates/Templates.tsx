import axios from '@/lib/axios'
import { Table, Modal, Button, message } from 'antd'
import { useState } from 'react'
import { dehydrate, useQuery, QueryClient, useMutation } from 'react-query'
import { Image, Form, Input, Select, SelectProps } from 'antd'

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
    key: 'template_img',
    render: (data: string, row: any) => {
      return <Image width={200} src={row.template_img} alt="" />
    }
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

const options: SelectProps['options'] = [
  { label: 'blog', value: 'blog', key: '1' },
  { label: 'store', value: 'store', key: '2' },
  { label: 'app', value: 'app', key: '3' },
  { label: 'travel', value: 'travel', key: '4' }
]
const Templates = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { data, isLoading, isError, refetch } = useQuery('templates', () => fetchProduct())
  const [form] = Form.useForm()

  const mutation = useMutation((data: any) => {
    return axios.post('http://localhost:4000/api/template/add', data)
  })

  const onTemplateAdd = (values: any) => {
    mutation.mutate(values, {
      onSuccess: () => {
        setIsModalOpen(false)
        refetch()
      }
    })
  }

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setIsModalOpen(true)
        }}
      >
        Add Template
      </Button>
      <Table dataSource={data} columns={columns} />
      <Modal
        title="Add Template"
        open={isModalOpen}
        confirmLoading={mutation.isLoading}
        onCancel={() => {
          setIsModalOpen(false)
        }}
        onOk={() => {
          form.submit()
          // setIsModalOpen(false)
        }}
      >
        <Form
          name="basic"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 20 }}
          initialValues={{ remember: true }}
          onFinish={onTemplateAdd}
          autoComplete="off"
          layout="vertical"
          form={form}
        >
          <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input your template name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Image URL"
            name="imageUrl"
            rules={[{ required: true, message: 'Please input your template image url!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Keywords"
            name="keywords"
            rules={[{ required: true, message: 'Please input your template keywords!' }]}
          >
            <Select mode="multiple" allowClear placeholder="Please select Keywords" options={options} />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please input your template description!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Templates
