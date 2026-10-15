// Du lieu mau (mock data) - thay cho database
// AccountRole: 1 = Admin, 2 = Staff
export const initialAccounts = [
  { id: 1, name: 'Nguyen Van A', email: 'a@fu.edu.vn', password: '123', role: 1 },
  { id: 2, name: 'Tran Thi B', email: 'b@fu.edu.vn', password: '123', role: 2 },
  { id: 3, name: 'Le Van C', email: 'c@fu.edu.vn', password: '123', role: 2 },
]

// IsActive: 1 = active, 0 = inactive
export const initialCategories = [
  { id: 1, name: 'Tuyen sinh', description: 'Tin tuc tuyen sinh', parentId: 0, isActive: 1 },
  { id: 2, name: 'Su kien', description: 'Su kien cua truong', parentId: 0, isActive: 1 },
  { id: 3, name: 'Hoc bong', description: 'Thong tin hoc bong', parentId: 1, isActive: 0 },
]

// NewsStatus: 1 = active, 0 = inactive
export const initialNews = [
  {
    id: 1,
    title: 'Thong bao tuyen sinh 2026',
    headline: 'Truong mo dot tuyen sinh moi',
    content: 'Noi dung chi tiet ve dot tuyen sinh nam 2026.',
    source: 'Phong tuyen sinh',
    categoryId: 1,
    tags: 'tuyensinh, 2026',
    status: 1,
    createdById: 2,
    createdDate: '2026-09-01',
  },
  {
    id: 2,
    title: 'Ngay hoi viec lam',
    headline: 'Hon 50 doanh nghiep tham gia',
    content: 'Ngay hoi viec lam duoc to chuc tai san truong.',
    source: 'Phong CTSV',
    categoryId: 2,
    tags: 'sukien, vieclam',
    status: 0,
    createdById: 3,
    createdDate: '2026-09-15',
  },
]

export const ROLES = { 1: 'Admin', 2: 'Staff' }
