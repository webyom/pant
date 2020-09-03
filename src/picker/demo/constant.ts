export const columns1: string[] = ['杭州', '宁波', '温州', '绍兴', '湖州', '嘉兴', '金华', '衢州'];

export const columns2: any[] = [
  {
    values: ['周一', '周二', '周三', '周四', '周五'],
  },
  {
    values: ['上午', '下午', '晚上'],
  },
];

export const columns3: any[] = [
  {
    values: '浙江',
    children: [
      {
        values: '杭州',
        children: [{ values: '西湖区' }, { values: '余杭区' }],
      },
      {
        values: '温州',
        children: [{ values: '鹿城区' }, { values: '瓯海区' }],
      },
    ],
  },
  {
    values: '福建',
    children: [
      {
        values: '福州',
        children: [{ values: '鼓楼区' }, { values: '台江区' }],
      },
      {
        values: '厦门',
        children: [{ values: '思明区' }, { values: '海沧区' }],
      },
    ],
  },
];

export const columns5: Record<string, string[]> = {
  浙江: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
  福建: ['福州', '厦门', '莆田', '三明', '泉州'],
};
