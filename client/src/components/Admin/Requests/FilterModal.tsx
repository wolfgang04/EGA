import React from "react";
import { Modal, Row, Col, Input } from "antd";
import type { DatePickerProps } from "antd";
import { DatePicker, Space } from "antd";

interface Props {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}

const FilterModal: React.FC<Props> = ({
  isModalOpen,
  handleCancel,
  handleOk,
}) => {
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <>
      <Modal
        title="Request Updates Filter"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Row gutter={[16, 8]}>
          <Col span={12}>
            <p>Request ID</p>
          </Col>
          <Col span={12}>
            <Input />
          </Col>

          <Col span={12}>
            <p>Request By</p>
          </Col>
          <Col span={12}>
            <Input />
          </Col>

          <Col span={12}>
            <p>Status</p>
          </Col>
          <Col span={12}>
            <Input />
          </Col>

          <Col span={12}>
            <p>Changed By</p>
          </Col>
          <Col span={12}>
            <Input />
          </Col>

          <Col span={12}>
            <p>Date</p>
          </Col>
          <Col span={12}>
            <Space direction="vertical">
              <DatePicker onChange={onChange} />
              <DatePicker onChange={onChange} picker="week" />
              <DatePicker onChange={onChange} picker="month" />
              <DatePicker onChange={onChange} picker="quarter" />
              <DatePicker onChange={onChange} picker="year" />
            </Space>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default FilterModal;
