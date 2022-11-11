import axios from '@/lib/axios'
import { Table, Modal, Button } from 'antd'
import { useState } from 'react'
import { dehydrate, useQuery, QueryClient, useMutation } from 'react-query'
import { Image, Form, Input, Select, SelectProps, Space } from 'antd'

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

const options: SelectProps['options'] = [
  { label: 'blog', value: 'blog', key: '1' },
  { label: 'store', value: 'store', key: '2' },
  { label: 'app', value: 'app', key: '3' },
  { label: 'travel', value: 'travel', key: '4' },
  { label: 'photograph', value: 'photograph', key: '5' },
  { label: 'homepage', value: 'homepage', key: '6' },
  { label: 'portfolio ', value: 'portfolio ', key: '7' },
  { label: 'photos', value: 'photos', key: '8' },
  { label: 'films', value: 'films', key: '9' },
  { label: 'liefstyle', value: 'liefstyle', key: '10' },
  { label: 'makeup', value: 'makeup', key: '11' },
  { label: 'clothing', value: 'clothing', key: '12' },
  { label: 'eCommerce', value: 'eCommerce', key: '13' },
  { label: 'fashion', value: 'fashion', key: '14' },
  { label: 'shop', value: 'shop', key: '15' },
  { label: 'accessories', value: 'accessories', key: '16' },
  { label: 'business', value: 'business', key: '17' },
  { label: 'investing', value: 'investing', key: '18' },
  { label: 'event', value: 'event', key: '19' },
  { label: 'music', value: 'music', key: '20' },
  { label: 'graphic designers', value: 'graphic designers', key: '21' },
  { label: 'application', value: 'application', key: '22' },
  { label: 'startup', value: 'startup', key: '23' },
  { label: 'creative', value: 'creative', key: '24' },
  { label: 'company', value: 'company', key: '25' }
]
const Templates = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { data, isLoading, isError, refetch } = useQuery('templates', () => fetchProduct())
  const [form] = Form.useForm()

  const columns = [
    {
      title: 'ID',
      dataIndex: 'template_id',
      key: 'template_id'
    },
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
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (data: string, row: any) => {
        return (
          <Space>
            <Button
              type="primary"
              onClick={() => {
                onTemplateRemove(row.template_id)
              }}
            >
              Remove
            </Button>
            <br />
            <Button
              type="primary"
              onClick={() => {
                form.setFieldsValue({
                  name: row.template_name,
                  imageUrl: row.template_img,
                  description: row.template_description,
                  keywords: row.template_keywords,
                  id: row.template_id
                })

                setIsModalOpen(true)
              }}
            >
              Edit
            </Button>
          </Space>
        )
      }
    }
  ]

  const mutation = useMutation((values) => {
    return axios.post('http://localhost:4000/api/template/add', values)
  })

  const onTemplateAdd = (values: any) => {
    console.log(values)
    mutation.mutate(values, {
      onSuccess: () => {
        setIsModalOpen(false)
        refetch()
      }
    })
  }

  const mutation2 = useMutation((template_id) => {
    return axios.post('http://localhost:4000/api/template/remove', { id: template_id })
  })

  const onTemplateRemove = (template_id: any) => {
    mutation2.mutate(template_id, {
      onSuccess: () => {
        refetch()
      }
    })
  }

  const mutation3 = useMutation((values) => {
    return axios.post('http://localhost:4000/api/template/edit', values)
  })

  const onTemplateEdit = (values: any) => {
    mutation3.mutate(values, {
      onSuccess: () => {
        setIsModalOpen(false)
        refetch()
      }
    })
  }

  return (
    <div>
      <Space direction="vertical">
        <Button
          type="primary"
          onClick={() => {
            form.resetFields()
            setIsModalOpen(true)
          }}
        >
          Add Template
        </Button>
        <Table dataSource={data} columns={columns} />
      </Space>
      <Modal
        title="Add Template"
        open={isModalOpen}
        confirmLoading={mutation.isLoading}
        onCancel={() => {
          setIsModalOpen(false)
        }}
        onOk={() => {
          form.submit()
        }}
      >
        <Form
          name="basic"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 20 }}
          initialValues={{ remember: true }}
          onFinish={(values) => {
            values.id ? onTemplateEdit(values) : onTemplateAdd(values)
          }}
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
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please input your template description!' }]}
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
          <Form.Item name="id" noStyle>
            <Input type="hidden" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Templates
