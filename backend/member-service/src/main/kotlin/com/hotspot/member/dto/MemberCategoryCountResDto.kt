package com.hotspot.member.dto

import com.hotspot.member.entity.Category

class MemberCategoryCountResDto (

    val category: Category,

    val visitedSet: Int,
)