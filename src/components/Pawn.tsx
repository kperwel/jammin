import React from "react";
import { DoubleSide } from "three";
import { Cylinder, Plane, useTexture } from "@react-three/drei";
import { Color, Vector3 } from "@react-three/fiber";

export enum TYPE {
  PLACEHOLDER,
  PERSON,
  ITEM,
}

const textureMap = new Map<TYPE, string>([
  [TYPE.PLACEHOLDER, "/placeholder/256x512.png"],
  [TYPE.PERSON, "/placeholder/person_256x512.png"],
  [TYPE.ITEM, "/placeholder/item_256x512.png"],
]);

interface PawnPropsType {
  type?: TYPE;
  color?: Color;
  position?: Vector3;
}

export function Pawn({
  type = TYPE.PLACEHOLDER,
  color = 0xff0000,
  position,
}: PawnPropsType = {}) {
  const url: string = textureMap.get(type) ?? textureMap.get(TYPE.PLACEHOLDER)!;
  const texture = useTexture(url);
  return (
    <group position={position}>
      <Cylinder args={[1, 1, 0.5]} position={[0, 0.5, 0]}>
        <meshStandardMaterial color={color} />
      </Cylinder>
      <Plane args={[1, 2.5]} position={[0, 2, 0]}>
        <meshStandardMaterial transparent map={texture} side={DoubleSide} />
      </Plane>
    </group>
  );
}
