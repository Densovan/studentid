import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Select,
  Layout,
  message,
  Upload,
  Spin,
} from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {
  CREATE_MEMBER,
  MEMBER,
  MEMBERS,
  UPDATE_MEMBER,
} from '../../graphql/members';
import { useMutation, useQuery } from '@apollo/client';
import { useParams } from 'react-router';

const { Option } = Select;
const { Content } = Layout;

const UpdateMember = () => {
  const [state, setState] = useState({
    imageUrl: null,
    loading: false,
  });
  const [form] = Form.useForm();
  const { id } = useParams();

  const [updateMember] = useMutation(UPDATE_MEMBER);
  const { refetch } = useQuery(MEMBERS);

  const { loading, data } = useQuery(MEMBER, {
    variables: { id },
  });

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      setState({
        imageUrl: info.file.response.image.filename,
        loading: false,
      });
    }
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 1;
    if (!isLt2M) {
      message.error('Your Image must smaller than 1MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const handleSubmit = async (values) => {
    updateMember({
      variables: {
        ...values,
        id,
        thumbnail: `${state.imageUrl === null ? thumbnail : state.imageUrl}`,
      },
    })
      .then(async (res) => {
        setState({ imageUrl: null });
        await message.success(res.data.updateMember.message, 3);
        form.resetFields();
        refetch();
        window.location.replace('/dashboard/member/all');
      })
      .catch((error) => console.error(error));
  };

  if (loading) {
    return (
      <center>
        <Spin tip="Loading ..."></Spin>
      </center>
    );
  }

  const { fullname, position, thumbnail } = data.member;

  return (
    <React.Fragment>
      <Content>
        <div className="contentContainer-width">
          <h1 className="header-content">Update Member</h1>
          <Form
            layout="vertical"
            name="basicForm"
            size="large"
            form={form}
            onFinish={handleSubmit}
            initialValues={{ fullname, position }}
          >
            <Row gutter={[14, 14]}>
              <Col span={20}>
                <Form.Item
                  label="Full name"
                  name="fullname"
                  rules={[
                    {
                      required: true,
                      message: 'Full Name is required!',
                    },
                  ]}
                >
                  <Input className="schoolInput" />
                </Form.Item>

                <Form.Item
                  label="Position"
                  name="position"
                  rules={[
                    {
                      required: true,
                      message: 'Position is required!',
                    },
                  ]}
                >
                  <Select
                    showSearch
                    className="schoolInput"
                    placeholder="Select your position..."
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option value="ប្រធានក្រុមប្រឹក្សាភិបាល">
                      ប្រធានក្រុមប្រឹក្សាភិបាល
                    </Option>
                    <Option value="សហស្ថាបនិក និងក្រុមប្រឹក្សាភិបាល">
                      សហស្ថាបនិក និងក្រុមប្រឹក្សាភិបាល
                    </Option>
                    <Option value="សហស្ថាបនិក និងអ្នកដឹកនាំ">
                      សហស្ថាបនិក និងអ្នកដឹកនាំ
                    </Option>
                    <Option value="សមាជិកក្រុមប្រឹក្សាភិបាល">
                      សមាជិកក្រុមប្រឹក្សាភិបាល
                    </Option>
                    <Option value="អ្នកគ្រប់គ្រងគម្រោង">
                      អ្នកគ្រប់គ្រងគម្រោង
                    </Option>
                    <Option value="អ្នកគ្រប់គ្រងកម្មវិធី">
                      អ្នកគ្រប់គ្រងកម្មវិធី
                    </Option>
                    <Option value="អ្នកថតរូប">អ្នកថតរូប</Option>
                    <Option value="រដ្ឋបាល និងគណនេយ្យ">
                      រដ្ឋបាល និងគណនេយ្យ
                    </Option>
                    <Option value="អ្នកប្រឹក្សាយោបល់">អ្នកប្រឹក្សាយោបល់</Option>
                    <Option value="ក្រុមការងារបច្ចេកទេសរៀបចំវេទិកា">
                      ក្រុមការងារបច្ចេកទេសរៀបចំវេទិកា
                    </Option>
                    <Option value="អ្នកផលិតវីដេអូ">អ្នកផលិតវីដេអូ</Option>
                    <Option value="អ្នកបង្កើតមាតិកា">អ្នកបង្កើតមាតិកា</Option>
                    <Option value="ក្រុមការងាររៃអង្គាស">
                      ក្រុមការងាររៃអង្គាស
                    </Option>
                    <Option value="អ្នកទំនាក់ទំនងសារធារណៈ">
                      អ្នកទំនាក់ទំនងសារធារណៈ
                    </Option>
                    <Option value="ហេរញ្ញិក">ហេរញ្ញិក</Option>
                    <Option value="ហេរញ្ញិកា">ហេរញ្ញិកា</Option>
                    <Option value="អ្នកអភិវឌ្ឈកម្មវិធី">
                      អ្នកអភិវឌ្ឈកម្មវិធី
                    </Option>
                    <Option value="អ្នកបណ្ដុះបណ្ដាល និងគ្រូបង្វឹក">
                      អ្នកបណ្ដុះបណ្ដាល និងគ្រូបង្វឹក
                    </Option>
                    <Option value="អ្នកស្ម័គ្រចិត្ត">អ្នកស្ម័គ្រចិត្ត</Option>
                    <Option value="អ្នកហាត់ការ">អ្នកហាត់ការ</Option>
                    <Option value="អ្នកសម្របសម្រួលកម្មវិធី">
                      អ្នកសម្របសម្រួលកម្មវិធី
                    </Option>
                    <Option value="អ្នករចនាបដាផ្សព្វផ្សាយ">
                      អ្នករចនាបដាផ្សព្វផ្សាយ
                    </Option>
                    <Option value="អ្នកសរសេរអត្ថបទ">អ្នកសរសេរអត្ថបទ</Option>
                    <Option value="អ្នកគ្រប់គ្រងការផ្សព្វផ្សាយលើបណ្ដាញសង្គម">
                      អ្នកគ្រប់គ្រងការផ្សព្វផ្សាយលើបណ្ដាញសង្គម
                    </Option>
                    <Option value="អ្នកទំនាក់ទំនងសាធារណៈ">
                      អ្នកទំនាក់ទំនងសាធារណៈ
                    </Option>
                    <Option value="អ្នកសរសរគម្រោង និងរបាយការណ៍">
                      អ្នកសរសរគម្រោង និងរបាយការណ៍
                    </Option>
                    <Option value="គណៈកម្មការ បច្ចេកទេសអំណាន">
                      គណៈកម្មការ បច្ចេកទេសអំណាន
                    </Option>
                    <Option value="គណៈកម្មការ បច្ចេកទេសសរសេរ">
                      គណៈកម្មការ បច្ចេកទេសសរសេរ
                    </Option>
                    <Option value="គណៈកម្មការ បច្ចេកទេសនិយាយសាធារណៈ">
                      គណៈកម្មការ បច្ចេកទេសនិយាយសាធារណៈ
                    </Option>
                    <Option value="គណៈកម្មការ បច្ចេកទេសសង្ខេបសៀវភៅ">
                      គណៈកម្មការ បច្ចេកទេសសង្ខេបសៀវភៅ
                    </Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={4}>
                <Form.Item label="Thumbnail" name="thumbnail">
                  <Upload
                    name="photo"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action={`${process.env.REACT_APP_SERVER}/upload/photo`}
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                  >
                    {state.imageUrl ? (
                      <img
                        src={`${process.env.REACT_APP_SERVER}/public/uploads/${state.imageUrl}`}
                        alt="thumbnail"
                        style={{ width: '120px', height: '100px' }}
                      />
                    ) : (
                      <img
                        src={`${process.env.REACT_APP_SERVER}/public/uploads/${thumbnail}`}
                        alt="thumbnail"
                        style={{ width: '120px', height: '100px' }}
                      />
                    )}
                  </Upload>
                  <div style={{ color: 'red', fontSize: '13px' }}>
                    The size must under 1MB
                  </div>
                </Form.Item>
              </Col>
            </Row>

            <div className="container-buttons-modal-add-user">
              <Row gutter={24}>
                <Col>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="button-submit"
                    >
                      Submit
                    </Button>
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item>
                    <Button type="text" className="button-cancel">
                      Cancel
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </div>
          </Form>
        </div>
      </Content>
    </React.Fragment>
  );
};

export default UpdateMember;
