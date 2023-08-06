package com.m4l0n.kneadly.mapper;

import com.m4l0n.kneadly.dto.KneadlyUserDTO;
import com.m4l0n.kneadly.dto.UserLoginDTO;
import com.m4l0n.kneadly.dto.UserRegistrationDTO;
import com.m4l0n.kneadly.model.KneadlyUser;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface KneadlyUserMapper {
    @Mapping(source = "gender", target = "userGender")
    @Mapping(source = "phoneNumber", target = "userPhoneNumber")
    @Mapping(source = "password", target = "userPassword")
    @Mapping(source = "emailAddress", target = "userEmail")
    @Mapping(source = "fullName", target = "userName")
    KneadlyUser userRegistrationDtoToEntity(UserRegistrationDTO userRegistrationDTO);

    @InheritInverseConfiguration(name = "userRegistrationDtoToEntity")
    UserRegistrationDTO entityToUserRegistrationDto(KneadlyUser kneadlyUser);

    @InheritConfiguration(name = "userRegistrationDtoToEntity")
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    KneadlyUser partialUpdate(UserRegistrationDTO userRegistrationDTO, @MappingTarget KneadlyUser kneadlyUser);

    @Mapping(source = "password", target = "userPassword")
    @Mapping(source = "emailAddress", target = "userEmail")
    KneadlyUser userLoginDtoToEntity(UserLoginDTO userLoginDTO);

    @InheritInverseConfiguration(name = "userLoginDtoToEntity")
    UserLoginDTO entityToUserLoginDto(KneadlyUser kneadlyUser);

    @InheritConfiguration(name = "userLoginDtoToEntity")
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    KneadlyUser partialUpdate(UserLoginDTO userLoginDTO, @MappingTarget KneadlyUser kneadlyUser);

    @Mapping(source = "role", target = "userRole")
    @Mapping(source = "gender", target = "userGender")
    @Mapping(source = "phoneNumber", target = "userPhoneNumber")
    @Mapping(source = "emailAddress", target = "userEmail")
    @Mapping(source = "fullName", target = "userName")
    @Mapping(source = "id", target = "userId")
    KneadlyUser kneadlyUserDtoToEntity(KneadlyUserDTO kneadlyUserDto);

    @InheritInverseConfiguration(name = "kneadlyUserDtoToEntity")
    KneadlyUserDTO entityToKneadlyUserDto(KneadlyUser kneadlyUser);

    @InheritConfiguration(name = "kneadlyUserDtoToEntity")
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    KneadlyUser partialUpdate(KneadlyUserDTO kneadlyUserDto, @MappingTarget KneadlyUser kneadlyUser);
}