package com.m4l0n.kneadly.mapper;

import com.m4l0n.kneadly.dto.UserLoginDTO;
import com.m4l0n.kneadly.dto.UserRegistrationDTO;
import com.m4l0n.kneadly.dto.KneadlyUserDTO;
import com.m4l0n.kneadly.model.KneadlyUser;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.FIELD)
public interface KneadlyUserMapper {
    KneadlyUserMapper INSTANCE = Mappers.getMapper(KneadlyUserMapper.class);

    @Mapping(target = "emailAddress", source = "email")
    @Mapping(target = "fullName", source = "name")
    KneadlyUserDTO kneadlyUserToKneadlyUserDTO(KneadlyUser kneadlyUser);

    @Mapping(target = "email", source = "emailAddress")
    @Mapping(target = "name", source = "fullName")
    KneadlyUser kneadlyUserDTOToKneadlyUser(KneadlyUserDTO kneadlyUserDTO);

    @Mapping(target = "email", source = "emailAddress")
    KneadlyUser userLoginDTOToKneadlyUser(UserLoginDTO userLoginDTO);

    @Mapping(target = "email", source = "emailAddress")
    @Mapping(target = "name", source = "fullName")
    KneadlyUser userRegistrationDTOToKneadlyUser(UserRegistrationDTO userRegistrationDTO);
}
