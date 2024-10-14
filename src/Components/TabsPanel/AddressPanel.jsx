
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from '../styles/addressPanel.module.scss'
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';
const { Option } = Select;

export const AddressPanel = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  return (
    <>
      <div className={styles.addressPanel}>
        <h4>Saved Addresses</h4>
        <div className={styles.addressList}>
          <div>
            <p><b>Kaushik Talukdar (Home)</b></p>
            <p>+91 1235677109</p>
          </div>
          <div>
            <p>Delivery addres</p>
            <p> 123A/B6710 apc road, 700006</p>
          </div>
          <div className={styles.buttonList}>

            <button onClick={showDrawer} icon={<PlusOutlined />}>Edit</button>
            <button>Delete</button>
            <input type="radio" name="address" id="address1" />
          </div>
        </div>

        <div className={styles.addressList}>
          <div>
            <p><b>Kaushik Talukdar (Home)</b></p>
            <p>+91 1235677109</p>
          </div>
          <div>
            <p>Delivery addres</p>
            <p> 123A/B6710 apc road, 700006</p>
          </div>
          <div className={styles.buttonList}>

            <button onClick={showDrawer} icon={<PlusOutlined />}>Edit</button>
            <button>Delete</button>
            <input type="radio" name="address" id="address2" />
          </div>
        </div>

        <div className={styles.addressList}>
          <div>
            <p><b>Kaushik Talukdar (Home)</b></p>
            <p>+91 1235677109</p>
          </div>
          <div>
            <p>Delivery addres</p>
            <p> 123A/B6710 apc road, 700006</p>
          </div>
          <div className={styles.buttonList}>

            <button onClick={showDrawer} icon={<PlusOutlined />}>Edit</button>
            <button>Delete</button>
            <input type="radio" name="address" id="address3" />
          </div>
        </div>

        <div className={styles.addressList}>
          <div>
            <p><b>Kaushik Talukdar (Home)</b></p>
            <p>+91 1235677109</p>
          </div>
          <div>
            <p>Delivery addres</p>
            <p> 123A/B6710 apc road, 700006</p>
          </div>
          <div className={styles.buttonList}>

            <button onClick={showDrawer} icon={<PlusOutlined />}>Edit</button>
            <button>Delete</button>
            <input type="radio" name="address" id="address4" />
          </div>
        </div>

        <div className={styles.newAddress}>
          <button className={styles.newAddressBtn} onClick={showDrawer} icon={<PlusOutlined />} >New address</button>

        </div>
        <AntDrawer setOpen={setOpen} open={open} />

      </div>
    </>
  );
};




const AntDrawer = ({ setOpen, open }) => {
  const onClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Drawer
        title="Address"
        width={520}
        onClose={onClose}
        open={open}
        className={styles.drawerHeaders}
        styles={{
          body: {
            paddingBottom: 100,
          },
        }}
        
      > 
        <Form layout="vertical" hideRequiredMark>
        <Row gutter={20}>
            <Col span={20} className={styles.columns}>
              <Form.Item
                name="name"
                label="Name"
                className={styles.labels}
                rules={[
                  {
                    required: true,
                    message: 'Enter Name',
                  },
                ]}
              >
                <Input placeholder="Enter Name" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={20} className={styles.columns}>
              <Form.Item
                name="Country/Region"
                label="Country/Region"
                rules={[
                  {
                    required: true,
                    message: 'Enter Country/Region',
                  },
                ]}
              >
                <Input
                  style={{
                    width: '100%',
                  }}

                  placeholder="Enter Country/Region"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={20 } className={styles.columns}>
              <Form.Item
                name="Street Address"
                label="Street Address"
                rules={[
                  {
                    required: true,
                    message: 'Eelect an Street Address',
                  },
                ]}
              >
                <Input
                  style={{
                    width: '100%',
                  }}

                  placeholder="Enter Street Address"
                />
              </Form.Item>
            </Col>
            <Col span={20} className={styles.columns}>
              <Form.Item
                name="town/city"
                label="town/city"
                rules={[
                  {
                    required: true,
                    message: 'Ehoose the town/city',
                  },
                ]}
              >
                <Input
                  style={{
                    width: '100%',
                  }}

                  placeholder="Enter town/city"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={20} className={styles.columns}>
              <Form.Item
                name="state"
                label="state"
                rules={[
                  {
                    required: true,
                    message: 'Ehoose the state',
                  },
                ]}
              >
                <Input
                  style={{
                    width: '100%',
                  }}

                  placeholder="Enter state"
                />
              </Form.Item>
            </Col>
            <Col span={20} className={styles.columns}>
              <Form.Item
                name="pincode"
                label="pincode"
                rules={[
                  {
                    required: true,
                    message: 'Ehoose the pincode',
                  },
                ]}
              >
                <Input
                  style={{
                    width: '100%',
                  }}

                  placeholder="Enter pincode"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20} className={styles.columns}>
            <Col span={20} className={styles.columns}>
              <Form.Item
                name="phone"
                label="phone"
                rules={[
                  {
                    required: true,
                    message: 'Enter phone',
                  },
                ]}
              >
                <Input
                  style={{
                    width: '100%',
                  }}

                  placeholder="Enter phone"
                />

              </Form.Item>
            </Col>

            <Col span={20} className={styles.columns}>
              <Form.Item
                name="Email Address"
                label="Email Address"
                rules={[
                  {
                    required: true,
                    message: 'Enter Email Address',
                  },
                ]}
              >
                <Input
                  style={{
                    width: '100%',
                  }}

                  placeholder="Enter Email Address"
                />

              </Form.Item>
            </Col>
          </Row>

          <Space>
            <Button onClick={onClose}  className={styles.cancelButton}>Cancel</Button>
            <Button onClick={onClose} type="primary"
              className={styles.submitButton}>
              Submit
            </Button>
          </Space>
        </Form>
      </Drawer>
    </div>
  )
}

