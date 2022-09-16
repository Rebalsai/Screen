import { Form, Row, Col,Input,Button,Select } from "antd";
import { Option } from "antd/lib/mentions";

const EditForm = (props) => {

    const backToGrid = () => {
		props?.history?.push("/commissions");
      
	};
    return (
        <>
           <Form>
            <Row>
                <Col>
                <Form.Item name="" label="Account Type" className="input-label"
            rules={[{ required: true, message: 'Is required' }]} >
                 <Select className="cust-input" placeholder="Select Account Type">
                    <Option>
                    </Option>
                </Select>
              </Form.Item>
                </Col>&emsp;
                <Col>
                <Form.Item name="" label="Zone" className="input-label" 
                rules={[{ required: true, message: 'Is required' }]} >
                     <Select  className="cust-input" placeholder="Select Zone" >                    
                    <Option>
                    </Option>
                </Select>
                        </Form.Item>
                </Col>
                </Row>
                <Row>
                    <Col>
                    <label className="page-title mt-16">SuisseBase Deposit </label>
                    <Form.Item name="" label="Fee(%)"  className="input-label" required
                    rules={[{ required: true, message: 'Is required' }]}>
                     <Input placeholder="Enter Fee" />
                        </Form.Item>
                    </Col>
                    <Col>
                    <Form.Item name="" label="SuisseBase Withdraw"  className="input-label" required
                    rules={[{ required: true, message: 'Is required' }]}>
                     <Input placeholder="SuisseBase Withdraw" />
                        </Form.Item>
                    </Col>
                    <Col>
                    <Form.Item name="" label="SuisseBase Buy"  className="input-label" required
                    rules={[{ required: true, message: 'Is required' }]}>
                     <Input placeholder="SuisseBase Buy" />
                        </Form.Item>
                    </Col>
                    <Col>
                    <Form.Item name="" label="SuisseBase Sell"  className="input-label" required
                    rules={[{ required: true, message: 'Is required' }]}>
                     <Input placeholder="SuisseBase Sell" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <Form.Item name="" label="Partner Deposit"  className="input-label" required
                    rules={[{ required: true, message: 'Is required' }]}>
                     <Input placeholder="Partner Deposit" />
                        </Form.Item>
                    </Col>
                    <Col>
                    <Form.Item name="" label="Partner Withdraw"  className="input-label" required
                    rules={[{ required: true, message: 'Is required' }]}>
                     <Input placeholder="Partner Withdraw" />
                        </Form.Item>
                    </Col>
                    <Col>
                    <Form.Item name="" label="Partner Buy"  className="input-label" required
                    rules={[{ required: true, message: 'Is required' }]}>
                     <Input placeholder="Partner Buy" />
                        </Form.Item>
                    </Col>
                    <Col>
                    <Form.Item name="" label="Partner Sell"  className="input-label" required
                    rules={[{ required: true, message: 'Is required' }]}>
                     <Input placeholder="SuisseBase Sell" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <Form.Item name="" label="Sub Partner Deposit %"  className="input-label" required
                    rules={[{ required: true, message: 'Is required' }]}>
                     <Input placeholder="Sub Partner Deposit %" />
                        </Form.Item>
                    </Col>
                    <Col>
                    <Form.Item name="" label="Sub Partner Withdraw %"  className="input-label" required
                    rules={[{ required: true, message: 'Is required' }]}>
                     <Input placeholder="Sub Partner Withdraw %" />
                        </Form.Item>
                    </Col>
                    <Col>
                    <Form.Item name="" label="Sub Partner Buy %"  className="input-label" required
                    rules={[{ required: true, message: 'Is required' }]}>
                     <Input placeholder="Sub Partner Buy %" />
                        </Form.Item>
                    </Col>
                    <Col>
                    <Form.Item name="" label="Sub Partner Sell %"  className="input-label" required
                    rules={[{ required: true, message: 'Is required' }]}>
                     <Input placeholder="Sub Partner Sell %" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <Form.Item name="" label="Provider Buy"  className="input-label" required
                    rules={[{ required: true, message: 'Is required' }]}>
                     <Input placeholder="Provider Buy" />
                        </Form.Item>
                    </Col>
                    <Col>
                    <Form.Item name="" label="Provider Sell"  className="input-label" required
                    rules={[{ required: true, message: 'Is required' }]}>
                     <Input placeholder="Provider Sell" />
                        </Form.Item>
                    </Col>
                    </Row>
                   {/* save button move right side--classname and button highlet-type */}
                    <Form.Item className="text-right mt-24">
                        <Button type="primary" htmlType="submit">Save</Button>&emsp;
                        <Button onClick={backToGrid}>Cancel</Button>
                    </Form.Item>
            
        </Form>
        </>
    )
}
export default EditForm;