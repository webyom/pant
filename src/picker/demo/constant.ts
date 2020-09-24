import { ColumnsType } from './index';

export const columns1: ColumnsType[] = [
  {
    value: '杭州',
    label: '杭州',
  },
  {
    value: '宁波',
    label: '宁波',
  },
  {
    value: '温州',
    label: '温州',
  },
  {
    value: '绍兴',
    label: '绍兴',
  },
  {
    value: '湖州',
    label: '湖州',
  },
  {
    value: '嘉兴',
    label: '嘉兴',
  },
  {
    value: '金华',
    label: '金华',
  },
];

export const columns2: ColumnsType[][] = [
  [
    {
      value: '周一',
      label: '周一',
    },
    {
      value: '周二',
      label: '周二',
    },
    {
      value: '周三',
      label: '周三',
    },
    {
      value: '周四',
      label: '周四',
    },
    {
      value: '周五',
      label: '周五',
    },
  ],
  [
    {
      value: '上午',
      label: '上午',
    },
    {
      value: '下午',
      label: '下午',
    },
    {
      value: '晚上',
      label: '晚上',
    },
  ],
];

export const columns3: ColumnsType[] = [
  {
    value: '浙江',
    label: '浙江',
    children: [
      {
        value: '杭州',
        label: '杭州',
        children: [
          {
            value: '西湖区',
            label: '西湖区',
          },
          {
            value: '余杭区',
            label: '余杭区',
          },
        ],
      },
      {
        value: '温州',
        label: '温州',
        children: [
          {
            value: '鹿城区',
            label: '鹿城区',
          },
          {
            value: '瓯海区',
            label: '瓯海区',
          },
        ],
      },
    ],
  },
  {
    value: '福建',
    label: '福建',
    children: [
      {
        value: '福州',
        label: '福州',
        children: [
          {
            value: '鼓楼区',
            label: '鼓楼区',
          },
          {
            value: '台江区',
            label: '台江区',
          },
        ],
      },
      {
        value: '厦门',
        label: '厦门',
        children: [
          {
            value: '思明区',
            label: '思明区',
          },
          {
            value: '海沧区',
            label: '海沧区',
          },
        ],
      },
    ],
  },
];

export const columns4: ColumnsType[] = [
  {
    value: '浙江',
    label: '浙江',
    children: [
      {
        value: '杭州',
        label: '杭州',
        children: [
          {
            value: '西湖区',
            label: '西湖区',
          },
          {
            value: '余杭区',
            label: '余杭区',
          },
        ],
      },
      {
        value: '温州',
        label: '温州',
      },
    ],
  },
  {
    value: '福建',
    label: '福建',
  },
];

export const columns5: any = {
  温州: [
    {
      value: '鹿城区',
      label: '鹿城区',
    },
    {
      value: '瓯海区',
      label: '瓯海区',
    },
  ],
  福建: [
    {
      value: '福州',
      label: '福州',
    },
    {
      value: '厦门',
      label: '厦门',
    },
  ],
  福州: [
    {
      value: '鼓楼区',
      label: '鼓楼区',
    },
    {
      value: '台江区',
      label: '台江区',
    },
  ],
  厦门: [
    {
      value: '思明区',
      label: '思明区',
    },
    {
      value: '海沧区',
      label: '海沧区',
    },
  ],
};
