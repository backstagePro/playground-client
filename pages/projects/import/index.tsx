import { Card, Input, Form } from 'antd';

interface IProps {

}

const Import: React.FC<IProps> = ({}) => {
  return (
    <Card>
      <Form
        layout="horizontal"
        size="small"
        labelCol={{span: 4}}
        wrapperCol={{span: 10}}
        onFinish={(values) => {
          alert(values);
        }}
      >
        <Form.Item 
          label="Path to project" 
          rules={[{
            required: true,
            message: "Please type path to project"
          }]}
          name="projectPath"
        >
          <Input 

          />
        </Form.Item>
      </Form>
    </Card>   
  )
}

export default Import;