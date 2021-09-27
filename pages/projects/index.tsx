import { Space, Button, Table } from "antd";
import Link from 'next/link';
import { useStore } from "../../src/state/stores/RootStore";
import { observer } from 'mobx-react-lite';
import { useEffect } from "react";
import { Card } from 'antd'

interface IProps {

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
        <a>Delete</a>
      </Space>
    ),
  },
];

const Index: React.FC<IProps> = observer(({}) => {

  let { projectStore } = useStore();

  useEffect(() => {

    projectStore.loadProjects();

    return () => {
      console.log("unmounted");
    }
  }, []);

  const renderProjectTable = () => {

    return (
      <div style={{paddingTop: '15px'}}>
        <Table columns={columns} dataSource={projectStore.projectList}></Table>
      </div>
    )
  }

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