import { Form, Row, Col,Select,Input,Button } from "antd";
import { Option } from "antd/lib/mentions";
import { getCommision,getZoneLu,saveCommission } from "../../api/apiCalls";
import { useState,useEffect } from "react";
const AddForm =(props)=>{
    const [getCommissions,setCommissions]=useState([])
    //crypto ni static pampistunam because id vastundi cyrpto ravatledu kabati
    const [type,setType]=useState("Crypto")
    //[] call anedi 1 time call avataniki 
    const[zoneLu,setZoneLu]=useState()
    useEffect(()=>{
        getSaveData(props.match.params.id,type);
        getZoneData()
      },
      []
      )

    const backToGrid = () => {
		props?.history?.push("/commissions");
      
	};
    // getcall lo props loki vachina data props.match.params.id.type anedi static gaa pampistunam
    const getSaveData=async()=>{
        const response = await getCommision(props.match.params.id,type);
        if(response.ok){
            setCommissions(response.data)
        }
    }
    const getZoneData=async()=>{   
        const response = await getZoneLu();
        if(response.ok){
            setZoneLu(response.data)
        }
    }
    const saveDetails=async(value)=>{
        debugger
        let obj = {
            dsMaxFee:value.dsMaxFee,
            wsMaxFee:value.wsMaxFee,
            buySMaxFee:value.buySMaxFee,
            sellSMaxFee:value.sellSMaxFee,
            partnerDMaxFee:value.partnerDMaxFee,
            partnerWMaxFee:value.partnerWMaxFee,
            partnerBuyMaxFee:value.partnerBuyMaxFee,
            depositMaxSubPartnerFee:value.depositMaxSubPartnerFee,
            withdrawMaxSubPartnerFee:value.withdrawMaxSubPartnerFee,
            buyMaxSubPartnerFee:value.buyMaxSubPartnerFee,
            sellMaxSubPartnerFee:value.sellMaxSubPartnerFee,
            pBuyMaxFee:value.pBuyMaxFee,
            pSellMaxFee:value.pSellMaxFee,
        } 
        const response = await saveCommission(obj)
        if (response.ok){

        }
    }

    return(
        <>
        <Form>
            <Row>
                <Col>
                <Form.Item name="accountType" label="Account Type" className="input-label"
            rules={[{ required: true, message: 'Is required' }]} >
                 <Select className="cust-input" placeholder="Select Account Type">
                    <Option value="Personal">Personal</Option>
                    <Option value="Business">Business</Option>
                </Select>
              </Form.Item>
                </Col>&emsp;
                <Col>
                <Form.Item name="zoneId" label="Zone" className="input-label" 
                rules={[{ required: true, message: 'Is required' }]} >
                     <Select  className="cust-input" placeholder="Select Zone" onChange={getZoneData} >                    
                     {zoneLu?.map((item, index) => (
                       <Option key={index} value={item.name}>
                     </Option>
                      ))}
                </Select>
                        </Form.Item>
                </Col>
                </Row>
                <Row>
                    <Col>
                    <label className="page-title mt-16">SuisseBase Deposit </label>
                    <Form.Item name="dsMaxFee" label="Fee(%)"  className="input-label" required
                    rules={[{ required: true, message: 'Is required' }]}>
                     <Input placeholder="Enter Fee" />
                        </Form.Item>
                    </Col>
                    <Col>
                    <Form.Item name="wsMaxFee" label="SuisseBase Withdraw"  className="input-label" required
                    rules={[{ required: true, message: 'Is required' }]}>
                     <Input placeholder="SuisseBase Withdraw" />
                        </Form.Item>
                    </Col>
                    <Col>
                    <Form.Item name="buySMaxFee" label="SuisseBase Buy"  className="input-label" required
                    rules={[{ required: true, message: 'Is required' }]}>
                     <Input placeholder="SuisseBase Buy" />
                        </Form.Item>
                    </Col>
                    <Col>
                    <Form.Item name="sellSMaxFee" label="SuisseBase Sell"  className="input-label" required
                    rules={[{ required: true, message: 'Is required' }]}>
                     <Input placeholder="SuisseBase Sell" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <Form.Item name="partnerDMaxFee" label="Partner Deposit"  className="input-label" required
                    rules={[{ required: true, message: 'Is required' }]}>
                     <Input placeholder="Partner Deposit" />
                        </Form.Item>
                    </Col>
                    <Col>
                    <Form.Item name="partnerWMaxFee" label="Partner Withdraw"  className="input-label" required
                    rules={[{ required: true, message: 'Is required' }]}>
                     <Input placeholder="Partner Withdraw" />
                        </Form.Item>
                    </Col>
                    <Col>
                    <Form.Item name="partnerBuyMaxFee" label="Partner Buy"  className="input-label" required
                    rules={[{ required: true, message: 'Is required' }]}>
                     <Input placeholder="Partner Buy" />
                        </Form.Item>
                    </Col>
                    <Col>
                    <Form.Item name="partnerSellMaxFee" label="Partner Sell"  className="input-label" required
                    rules={[{ required: true, message: 'Is required' }]}>
                     <Input placeholder="SuisseBase Sell" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <Form.Item name="depositMaxSubPartnerFee" label="Sub Partner Deposit %"  className="input-label" required
                    rules={[{ required: true, message: 'Is required' }]}>
                     <Input placeholder="Sub Partner Deposit %" />
                        </Form.Item>
                    </Col>
                    <Col>
                    <Form.Item name="withdrawMaxSubPartnerFee" label="Sub Partner Withdraw %"  className="input-label" required
                    rules={[{ required: true, message: 'Is required' }]}>
                     <Input placeholder="Sub Partner Withdraw %" />
                        </Form.Item>
                    </Col>
                    <Col>
                    <Form.Item name="buyMaxSubPartnerFee" label="Sub Partner Buy %"  className="input-label" required
                    rules={[{ required: true, message: 'Is required' }]}>
                     <Input placeholder="Sub Partner Buy %" />
                        </Form.Item>
                    </Col>
                    <Col>
                    <Form.Item name="sellMaxSubPartnerFee" label="Sub Partner Sell %"  className="input-label" required
                    rules={[{ required: true, message: 'Is required' }]}>
                     <Input placeholder="Sub Partner Sell %" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <Form.Item name="pBuyMaxFee" label="Provider Buy"  className="input-label" required
                    rules={[{ required: true, message: 'Is required' }]}>
                     <Input placeholder="Provider Buy" />
                        </Form.Item>
                    </Col>
                    <Col>
                    <Form.Item name="pSellMaxFee" label="Provider Sell"  className="input-label" required
                    rules={[{ required: true, message: 'Is required' }]}>
                     <Input placeholder="Provider Sell" />
                        </Form.Item>
                    </Col>
                    </Row>
                   {/* save button move right side--classname and button highlet-type  and validations kosam htmlType*/}
                    <Form.Item className="text-right mt-24">
                        <Button type="primary" htmlType="submit" onClick={saveDetails}>Save</Button>&emsp;
                        <Button onClick={backToGrid}>Cancel</Button>
                    </Form.Item>
            
        </Form>
        </>
    )
}
export default AddForm;