import { Card, Button, Input, Form, message } from 'antd';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useApiClient } from '../../../src/hooks/useApiClient';

interface IProps {

}

const Import: React.FC<IProps> = ({}) => {

  const { getClient } = useApiClient();
  const router = useRouter();
  
  const importProject = useCallback( async (projectPath: string) => {

    let client = await getClient();

    await client.importProject(projectPath);

    message.success("Project added");

    router.push('/projects');
  }, []);

  return (
    <Card>
      <Form
        layout="horizontal"
        size="small"
        labelCol={{span: 4}}
        wrapperCol={{span: 10}}
        initialValues={{
          projectPath: '/usr/src/playground-example-project'
        }}
        onFinish={(values) => {
          
          importProject(values.projectPath)
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

        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Button type="primary" htmlType="submit">
              Import
          </Button>
        </Form.Item>  
      </Form>
    </Card>   
  )
}

export default Import;