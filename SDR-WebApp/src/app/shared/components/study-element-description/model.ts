export class Attribute {
  name:string = '';
  value: string = '';
}

export class Accordian{
  accordianName:string = '';
  attributeList: Attribute[] = [];
  subAccordianList: Accordian[] = [];
  isSelected = false;
  isShow = false;
  isHighlighted = false;
}