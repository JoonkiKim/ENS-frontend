import { gql } from "@apollo/client";

// ============= AUTH =============
export const LOGIN = gql`
  mutation Login($customId: String!, $password: String!, $keepLoggedIn: Boolean) {
    login(customId: $customId, password: $password, keepLoggedIn: $keepLoggedIn)
  }
`;

export const RESTORE_ACCESS_TOKEN = gql`
  mutation RestoreAccessToken {
    restoreAccessToken
  }
`;

export const LOGOUT = gql`
  mutation Logout {
    logout
  }
`;

export const SEND_PASSWORD_RESET_LINK = gql`
  mutation SendPasswordResetLink($email: String!) {
    sendPasswordResetLink(email: $email)
  }
`;

export const RESET_PASSWORD = gql`
  mutation ResetPassword($token: String!, $newPassword: String!) {
    resetPassword(token: $token, newPassword: $newPassword)
  }
`;

// ============= USER =============
export const CREATE_USER = gql`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      id
      customId
      name
      email
      phone
      generation
      entrance
      createdAt
    }
  }
`;

export const CREATE_USERS_BATCH = gql`
  mutation CreateUsersBatch($users: CreateUsersBatchInput!) {
    createUsers(users: $users) {
      id
      customId
      name
      email
      phone
      generation
      entrance
      createdAt
    }
  }
`;

export const FETCH_LOGIN_USER = gql`
  query FetchLoginUser {
    fetchLoginUser {
      id
      customId
      name
      email
      phone
      generation
      entrance
      imageUrl
      linkedin
      noCoffeeChat
      abroad
      memo
      role
      userMajors {
        userId
        majorId
        major {
          id
          name
          isCustom
        }
        isPrimary
      }
      careers {
        id
        company
        position
        startDate
        endDate
        isCurrent
        adminOnly
        positionCategory {
          id
          name
          isCustom
        }
        industry {
          id
          name
          isCustom
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      deletedAt
    }
  }
`;

export const FETCH_ALL_USERS = gql`
  query FetchAllUsers {
    fetchAllUsers {
      id
      customId
      name
      generation
      phone
      email
      entrance
      imageUrl
      linkedin
      noCoffeeChat
      abroad
      memo
      role
      createdAt
      updatedAt
      deletedAt
      careers {
        id
        company
        position
        startDate
        endDate
        isCurrent
        positionCategory {
          id
          name
        }
        industry {
          id
          name
        }
      }
    }
  }
`;

export const FETCH_USER = gql`
  query FetchUser($userId: String!) {
    fetchUser(userId: $userId) {
      id
      name
      generation
      phone
      email
      imageUrl
      linkedin
      entrance
      noCoffeeChat
      abroad
      userMajors {
        userId
        majorId
        major {
          id
          name
        }
        isPrimary
      }
      careers {
        id
        company
        position
        startDate
        endDate
        isCurrent
        positionCategory {
          id
          name
        }
        industry {
          id
          name
        }
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($userId: String!, $updateUserInput: UpdateUserInput!) {
    updateUser(userId: $userId, updateUserInput: $updateUserInput) {
      id
      customId
      name
      email
      phone
      generation
      entrance
      imageUrl
      linkedin
      noCoffeeChat
      abroad
      memo
      role
      updatedAt
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($userId: String!) {
    deleteUser(userId: $userId)
  }
`;

export const UPDATE_USERS_BATCH = gql`
  mutation UpdateUsersBatch($updates: UpdateUsersBatchInput!) {
    updateUsers(updates: $updates) {
      id
      name
      role
      memo
      updatedAt
    }
  }
`;

// ============= BOARD =============
export const FETCH_ALL_BOARDS = gql`
  query FetchAllBoards {
    fetchAllBoards {
      id
      number
      title
      category
      content
      imageUrl
      createdAt
      updatedAt
      user {
        id
        name
      }
    }
  }
`;

export const FETCH_BOARD = gql`
  query FetchBoard($boardId: String!) {
    fetchBoard(boardId: $boardId) {
      id
      number
      title
      category
      content
      imageUrl
      createdAt
      updatedAt
      user {
        id
        name
      }
    }
  }
`;

export const CREATE_BOARD = gql`
  mutation CreateBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      id
      title
      category
      content
      imageUrl
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_BOARD = gql`
  mutation UpdateBoard($boardId: String!, $updateBoardInput: UpdateBoardInput!) {
    updateBoard(boardId: $boardId, updateBoardInput: $updateBoardInput) {
      id
      title
      category
      content
      imageUrl
      updatedAt
    }
  }
`;

export const DELETE_BOARD = gql`
  mutation DeleteBoard($boardId: String!) {
    deleteBoard(boardId: $boardId)
  }
`;

// ============= MAJOR =============
export const FETCH_ALL_MAJORS = gql`
  query FetchAllMajors {
    fetchAllMajors {
      id
      name
      isCustom
    }
  }
`;

// ============= INDUSTRY =============
export const FETCH_ALL_INDUSTRIES = gql`
  query FetchAllIndustries {
    fetchAllIndustries {
      id
      name
      isCustom
    }
  }
`;

// ============= POSITION CATEGORY =============
export const FETCH_ALL_POSITION_CATEGORIES = gql`
  query FetchAllPositionCategories {
    fetchAllPositionCategories {
      id
      name
      isCustom
    }
  }
`;
