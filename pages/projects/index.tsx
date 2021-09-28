import { Space, Button, Table, message } from "antd";
import Link from 'next/link';
import { useStore } from "../../src/state/stores/RootStore";
import { observer } from 'mobx-react-lite';
import { useEffect } from "react";
import { Card } from 'antd';

interface IProps {

}

const Index: React.FC<IProps> = observer(({}) => {

  let { projectStore } = useStore();

  useEffect(() => {

    projectStore.loadProjects();

    return () => {
      console.log("unmounted");
    }
  }, []);

  const deleteProject = async (id: string) => {

    await projectStore.deleteProject(id);
  
    message.success("Project was deleted");
  }

  const renderProjectTable = () => {

    return (
      <div style={{paddingTop: '15px'}}>
        <Table columns={columns} dataSource={projectStore.projectList}></Table>
      </div>
    )
  }


  const columns = [
    {
      title: 'Project path',
      dataIndex: 'path',
      key: 'path',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: any) => (
        <Space size="middle">
          <Link href={`/projects/${record._id}`}>
            <a>Open</a>
          </Link>
          <Button 
            type="dashed"
            danger={true}
            onClick={deleteProject.bind(this, record._id)}>
              Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Card>
        <Link href="/projects/import">
          <Button type="primary">Import project</Button>
        </Link>
      </Card>
      <Card title="Projects">
        {renderProjectTable()}
      </Card>
    </div>
  )
});

export default Index;