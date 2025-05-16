import { Button, Col, Input, Modal, Row } from "antd";
import React from "react";

interface Props {
  cart: Cart[];
  onClose: () => void;
  onChangeAmount: (id: string, newQuantity: number) => void;
  onSubmit: (e: React.FormEvent) => void;
  open: boolean;
}

interface Cart {
  quantity: number;
  note: string;
  id: string;
  name: string;
}

const Cart: React.FC<Props> = ({
  cart,
  onClose,
  open,
  onChangeAmount,
  onSubmit,
}) => {
  return (
    <>
      <Modal
        title="Tools to borrow"
        open={open}
        onOk={onSubmit}
        onCancel={onClose}
      >
        {cart.map((item) => (
          <Row key={item.id}>
            <Col span={8}>{item.name}</Col>
            <Col span={8} offset={4}>
              <Input
                type="number"
                value={item.quantity}
                onChange={(e) =>
                  onChangeAmount(item.id, Number(e.target.value))
                }
                min={1}
              />
            </Col>
          </Row>
        ))}
      </Modal>
    </>
  );
};

export default Cart;
