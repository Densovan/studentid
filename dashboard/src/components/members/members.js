import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Table, Layout, Tag, Popconfirm, Spin, message, Button } from 'antd';
import { Link } from 'react-router-dom';
import { QuestionCircleOutlined } from '@ant-design/icons';
import {
  MEMBERS,
  DELETE_MEMBER,
  UPDATE_MEMBER_POSTION,
} from '../../graphql/members';
import { useMutation, useQuery } from '@apollo/client';
import moment from 'moment';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';

const type = 'DragableBodyRow';
const { Content } = Layout;

const DragableBodyRow = ({
  index,
  moveRow,
  className,
  style,
  ...restProps
}) => {
  const ref = useRef();
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: (monitor) => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        dropClassName:
          dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
      };
    },
    drop: (item) => {
      moveRow(item.index, index);
    },
  });
  const [, drag] = useDrag({
    type,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drop(drag(ref));

  return (
    <tr
      ref={ref}
      className={`${className}${isOver ? dropClassName : ''}`}
      style={{ cursor: 'move', ...style }}
      {...restProps}
    />
  );
};

const Members = () => {
  const [updateMemberPosition] = useMutation(UPDATE_MEMBER_POSTION);
  const [deleteMember] = useMutation(DELETE_MEMBER);
  const { loading, data, error, refetch } = useQuery(MEMBERS);
  const [newData, setData] = useState([]);

  useEffect(() => {
    if (loading === false && data) {
      setData(data.members);
    }
  }, [loading, data]);

  const moveRow = useCallback(
    (dragIndex, hoverIndex) => {
      const dragRow = newData[dragIndex];
      updateMemberPosition({
        variables: {
          id: dragRow.id,
          key: hoverIndex,
        },
      }).then((res) => {
        console.log(res.data);
      });
      setData(
        update(newData, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragRow],
          ],
        })
      );
    },
    [newData]
  );

  if (loading || !data) {
    return (
      <center>
        <Spin tip="Loading ..."></Spin>
      </center>
    );
  }

  const columns = [
    {
      title: 'Photo',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      width: '15%',
      render: (thumbnail) => {
        return (
          <img
            style={{ borderRadius: '4px' }}
            // height="40px"
            width="60px"
            src={`${process.env.REACT_APP_SERVER}/public/uploads/${thumbnail}`}
            alt="avatar"
          />
        );
      },
    },
    {
      title: 'Full Name',
      dataIndex: 'fullname',
      key: 'fullname',
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (created_at) => {
        return moment(parseInt(created_at)).format('Do MMMM YYYY');
      },
    },
    {
      title: 'Updated At',
      dataIndex: 'updated_at',
      key: 'updated_at',
      render: (updated_at) => {
        return moment(parseInt(updated_at)).format('Do MMMM YYYY');
      },
    },

    {
      title: 'Actions',
      dataIndex: 'id',
      key: 'actions',
      render: (id) => {
        return (
          <React.Fragment>
            <Link to={`/dashboard/member/edit/${id}`}>
              <Tag color="#2176ff">Edit</Tag>
            </Link>
            <Popconfirm
              title="Are you sure to delete this member?"
              onConfirm={() => {
                deleteMember({ variables: { id } })
                  .then((res) => {
                    message.success(res.data.deleteMember.message);
                    refetch();
                  })
                  .catch((error) => {
                    let err = JSON.parse(JSON.stringify(error));
                    message.error(err.graphQLErrors[0].message);
                  });
              }}
              okText="Yes"
              cancelText="No"
              icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            >
              <Tag color="#ff4333">Delete</Tag>
            </Popconfirm>
          </React.Fragment>
        );
      },
    },
  ];

  const components = {
    body: {
      row: DragableBodyRow,
    },
  };

  return (
    <React.Fragment>
      <Content>
        <div>
          <h1 className="header-content">Table Member</h1>
          <DndProvider backend={HTML5Backend}>
            <Table
              columns={columns}
              dataSource={newData}
              components={components}
              onRow={(record, index) => ({
                index,
                moveRow,
              })}
              // pagination={100}
              pagination={{ pageSize: 100 }}
            />{' '}
          </DndProvider>
          {/* <Table columns={columns} dataSource={data.members} /> */}
        </div>
      </Content>
    </React.Fragment>
  );
};

export default Members;
