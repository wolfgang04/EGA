import { DeleteOutlined } from "@ant-design/icons";
import { Button, Col, Flex, Input, Modal, Row } from "antd";
import React from "react";

interface Props {
  cart: Cart[];
  onClose: () => void;
  onChangeAmount: (id: string, newQuantity: number) => void;
  onSubmit: (e: React.FormEvent) => void;
  open: boolean;
  onRemove: (id: string) => void;
}

interface Cart {
  quantity: number;
  note: string;
  id: string;
  name: string;
  max: number;
}

const Cart: React.FC<Props> = ({
  cart,
  onClose,
  open,
  onChangeAmount,
  onSubmit,
  onRemove,
}) => {
  const handleChangeAmount = (
    e: React.ChangeEvent<HTMLInputElement>,
    item: Cart,
  ) => {
    const val = Number(e.target.value);
    if (val > item.max) {
      onChangeAmount(item.id, item.max); // clamp to max
    } else if (val < 1) {
      onChangeAmount(item.id, 1); // clamp to min
    } else {
      onChangeAmount(item.id, val);
    }
  };

  return (
    <>
      <Modal
        title="Tools to borrow"
        open={open}
        onOk={onSubmit}
        onCancel={onClose}
      >
        <div className="flex flex-col gap-2">
          {cart.map((item) => (
            <Row key={item.id}>
              <Col span={8}>{item.name}</Col>
              <Col span={12} offset={4}>
                <Flex justify="space-between" gap={10}>
                  <Input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleChangeAmount(e, item)}
                    min={1}
                    max={item.max}
                  />

                  <Button
                    color="default"
                    variant="outlined"
                    onClick={() => onRemove(item.id)}
                  >
                    <DeleteOutlined />
                  </Button>
                </Flex>
              </Col>
            </Row>
          ))}
        </div>
      </Modal>
    </>
  );
};

export default Cart;
