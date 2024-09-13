import React from 'react'
import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse, theme } from 'antd';
import '../Components/styles/termsofuse.css'
const text = `
A dog is a type of domesticated animal.
Known for its loyalty and faithfulness,
it can be found as a welcome guest in many households across the world.
`;
const getItems = (panelStyle) => [
{
  key: '1',
  label: <span style={{ fontSize: '35px' }}>Introduction</span>,
  children: <Introduction/>,
  style: panelStyle,
},
{
  key: '2',
  label: <span style={{ fontSize: '35px' }}>Information You Provide To Us</span>,
  children:<ProvideInformation/>,
  style: panelStyle,
},
{
  key: '3',
  label: <span style={{ fontSize: '35px' }}>How we disclose your information</span>,
  children: <DiscloseInfo/>,
  style: panelStyle,
},
];

 export default function  (){
 
const { token } = theme.useToken();
const panelStyle = {
  marginBottom: 24,
  background: token.colorFillAlter,
  borderRadius: token.borderRadiusLG,
  border: 'none',
};
  return (

    <div  className='termsofuse flex'>  
    <SideContent/>
    <div style={{width:"65%"}}>
        <header className='head'>
            <h1>Our Privacy Policy</h1>
            <p>last update june 4 2024</p>
        </header>
        <Collapse
      bordered={false}
      defaultActiveKey={['1']}
      expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
      style={{
        background: token.colorBgContainer,
      }}
      items={getItems(panelStyle)}
    />
    </div> </div>
  )
}


const SideContent = ()=> {
    return(
        <div className='sideContent' style={{width:"30%",  paddingRight: '20px'}}>
        <header className='side-header'>
           <h1> Privacy Policy</h1>
        </header>
        <p>Information you provide to us</p>
        <p>How we disclose your information</p>
        <p><b>US State Privacy Notices</b></p>
        <p><b>Make a Privacy Request</b></p>
        </div>
    )
}
const Introduction =()=> {
    return(
<>

<p>Rawlings Sporting Goods Company, Inc. and our affiliates <b> (together Drakon,” “we” or “us”)</b> are committed to protecting the privacy of our users’ Personal Information (as defined below). This policy (the <b>“Privacy Policy” </b> or this “Policy”) describes how we collect, use, retain, disclose, and otherwise process personal information. This Privacy Policy applies to all personal information we collect:</p>
<ul>
    <li>
    Through our websites and apps (collectively, the “websites” or “website”), including:<a href='www.rawlings.com'> www.rawlings.com</a>, <a href='www.easton.com'>www.easton.com</a>,<a href='www.mikensports.com'>www.mikensports.com</a>, <a href='www.mikensports.com'>www.mikensports.com</a>  ,  social media sites such as Facebook, Instagram, YouTube, Pinterest, WhatsApp and Twitter provided or sponsored by Rawlings.
    </li>
    <li>In email, text, chat, and other electronic messages between you and the websites.</li>
    <p>
    We do not collect credit or debit card information directly; we rely on third parties to process credit and debit card transactions, and those transactions are subject to those third parties’ own privacy policies.
    </p><br/>
    <br/>
    <p>We collect information from you to operate our websites, to offer products and services to you, and to increase the effectiveness of our advertising and promotion of products and services. The type of information we collect depends on the specific products and services being provided when you are visiting or interacting with our websites.</p><br/><br/>
    <p>If we decide to change our Privacy Policy, we will update our Policy with those changes and update the Privacy Policy modification date. Please check back regularly to review any changes to this Privacy Policy and each time you submit personal information to us. If you do not agree with this Privacy Policy or any changes to it, you should not use or access the Websites.</p>
    <br/>
    <br/>
    <p>This Privacy Policy does not apply to information collected by any third party, including through any application or content, including advertising, that may link to or be accessible from or on the Website. Please note that this Policy does not apply to our processing of information about job applicants, employees or contractors. It also does not cover the processing of information in connection with buy now pay later (“<b> BNPL” </b>) payment options, and any privacy inquiries related to BNPL payment options should be directed to the BNPL provider</p>
</ul>
</>
    )
}

const ProvideInformation = () => {

    return(
        <>
        <p>We collect the personal information you provide to us when you purchase our products or visit our website. The categories of information we may collect include:</p>
        <ul>

            <li>
            Personal Identifiers, including name, email address, postal address, telephone number, and online Identifiers
            </li>
            <li>Internet Activity</li>
            <li>Commercial Information, including purchases</li>
            <li>Financial Information, including credit or debit card number</li>
            <li>Location Information, including general location data</li>
            <li>Inferences from Other Data, including inferences created from other personal information collected</li>
        </ul>
        <br/>
       

        <h2>Browser Cookies</h2>
        <p>We use cookies to create a better experience for you on our site. For example, cookies prevent you from having to login repeatedly, and they help us remember items you've added to your cart. We also use third-party cookies, which are cookies placed by third parties for advertising and analytics purposes. You can control these cookies through your browser settings.</p>

        
        <h2>Information from other sources</h2>
        <p>We may collect personal information about you from third-party sources, including Ad Networks and Retail Partners.</p>

        <p>The categories of information we may collect include:</p>
       
        <p>Ad Networks</p>
        <ul>
            <li>
            Personal Identifiers, including Name, Email address, and Telephone number
            </li>
        </ul>
        
        <p>Retailer Partners</p>
        <ul>
            <li>
            Personal Identifiers, including Name and Postal address
            </li>
            <li>
            Commercial Information, including Purchases
            </li>
        </ul>
       
       <h2>How long we keep your data</h2>
      <p>
      We retain information for as long as necessary to carry out the purposes for which we originally collected it and for other business purposes explained in this Policy (including to satisfy our legal, accounting or reporting requirements), unless a longer retention period is required or allowed under law.
      </p><br/>
      <h2>Why we process your information</h2>
      <p>We process personal information for the following business and commercial purposes:</p>
      <ul>
        <li>
        Analyzing Data
        </li>
        <li>Conducting Surveys</li>
        <li>Creating Customer Profiles</li>
        <li>Delivering Targeted Ads</li>
        <li>Fulfilling Customer Orders</li>
        <li>Improving our Products & Services</li>
        <li>Managing Event & Guest Data</li>
        <li>Meeting Compliance & Legal Requirements</li>
        <li>Operating Our Website or Mobile Apps</li>
        <li>Preventing Fraud</li>
        <li>Processing Payments</li>
        <li>Providing Customer Support</li>
        <li>Sending Promotional Communications</li>
        <li>Storing and Managing Data</li>
        <li>Tracking Purchases & Customer Data</li>
      </ul>
        </>
    )
}


const DiscloseInfo = () => {
  return (
    <>
      <p>We may disclose personal information about you for business and commercial purposes when you purchase our products or visit our website:</p>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Personal Information Category</th>
            <th>Categories of Service Providers</th>
            <th>Categories of Third Parties</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Personal Identifiers</td>
            <td>
              Ad Networks, Business Operations Tool, Commerce Software Tools, Customer Support Tools, Data Analytics Providers, Governance, Risk & Compliance Software, IT Contractors, IT Infrastructure Services, Payment Processors, Sales & Marketing Contractors, and Sales & Marketing Tools
            </td>
            <td>Ad Networks, Payment Processors, Sales & Marketing Tools, and Shipping Services</td>
          </tr>
          <tr>
            <td>Internet Activity</td>
            <td>
              Ad Networks, Commerce Software Tools, Customer Support Tools, Data Analytics Providers, IT Contractors, IT Infrastructure Services, Sales & Marketing Contractors, and Sales & Marketing Tools
            </td>
            <td>Ad Networks and Sales & Marketing Tools</td>
          </tr>
          <tr>
            <td>Commercial Information</td>
            <td>
              Ad Networks, Business Operations Tool, Commerce Software Tools, IT Contractors, Payment Processors, Sales & Marketing Contractors, and Sales & Marketing Tools
            </td>
            <td>Ad Networks and Payment Processors</td>
          </tr>
          <tr>
            <td>Location Information</td>
            <td>
              Ad Networks, Commerce Software Tools, Customer Support Tools, Data Analytics Providers, IT Contractors, Sales & Marketing Contractors, and Sales & Marketing Tools
            </td>
            <td>Ad Networks and Sales & Marketing Tools</td>
          </tr>
          <tr>
            <td>Inferences from Other Data</td>
            <td>
              Ad Networks, Sales & Marketing Contractors, and Sales & Marketing Tools
            </td>
            <td>Ad Networks and Sales & Marketing Tools</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

