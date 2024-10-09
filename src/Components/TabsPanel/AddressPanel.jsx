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

            <button  onClick={showDrawer} icon={<PlusOutlined />}>Edit</button>
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

            <button  onClick={showDrawer} icon={<PlusOutlined />}>Edit</button>
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

            <button  onClick={showDrawer} icon={<PlusOutlined />}>Edit</button>
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

            <button  onClick={showDrawer} icon={<PlusOutlined />}>Edit</button>
            <button>Delete</button>
            <input type="radio" name="address" id="address4" />
          </div>
        </div>

        <div className={styles.newAddress}>
          <button className={styles.newAddressBtn}  onClick={showDrawer} icon={<PlusOutlined />} >New address</button>

        </div>
<AntDrawer setOpen={setOpen} open={open}/>
      
      </div>
    </>
  );
};

const AntDrawer = ({setOpen, open}) => {
  const onClose = () => {
    setOpen(false);
  };
  return(
    <div>
       <Drawer
        title="Create a new account"
        width={520}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 100,
          },
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onClose} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={10}>
              <Form.Item
                name="name"
                label="Name"
                rules={[
                  {
                    required: true,
                    message: 'Please enter user name',
                  },
                ]}
              >
                <Input placeholder="Please enter user name" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="Country/Region"
                label="Country/Region"
                rules={[
                  {
                    required: true,
                    message: 'Please enter Country/Region',
                  },
                ]}
              >
                <Input
                  style={{
                    width: '100%',
                  }}
                
                  placeholder="Please enter Country/Region"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={10}>
              <Form.Item
                name="Street Address"
                label="Street Address"
                rules={[
                  {
                    required: true,
                    message: 'Please select an Street Address',
                  },
                ]}
              >
                 <Input
                  style={{
                    width: '100%',
                  }}
                
                  placeholder="Please enter Street Address"
                />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="town/city"
                label="town/city"
                rules={[
                  {
                    required: true,
                    message: 'Please choose the town/city',
                  },
                ]}
              >
               <Input
                  style={{
                    width: '100%',
                  }}
                
                  placeholder="Please enter town/city"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={10}>
              <Form.Item
                name="state"
                label="state"
                rules={[
                  {
                    required: true,
                    message: 'Please choose the state',
                  },
                ]}
              >
                <Input
                  style={{
                    width: '100%',
                  }}
                
                  placeholder="Please enter state"
                />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="pincode"
                label="pincode"
                rules={[
                  {
                    required: true,
                    message: 'Please choose the pincode',
                  },
                ]}
              >
                 <Input
                  style={{
                    width: '100%',
                  }}
                
                  placeholder="Please enter pincode"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={10}>
              <Form.Item
                name="phone"
                label="phone"
                rules={[
                  {
                    required: true,
                    message: 'please enter phone',
                  },
                ]}
              >
                 <Input
                  style={{
                    width: '100%',
                  }}
                
                  placeholder="Please enter phone"
                />
             
              </Form.Item>
            </Col>

            <Col span={10}>
              <Form.Item
                name="Email Address"
                label="Email Address"
                rules={[
                  {
                    required: true,
                    message: 'please enter Email Address',
                  },
                ]}
              >
                 <Input
                  style={{
                    width: '100%',
                  }}
                
                  placeholder="Please enter Email Address"
                />
             
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </div>
  )
}

