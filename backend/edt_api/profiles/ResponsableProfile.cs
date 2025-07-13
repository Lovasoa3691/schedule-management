using AutoMapper;
using edt_api.dtos;
using edt_api.models;

namespace edt_api.profiles;

public class ResponsableProfile:Profile
{
    public ResponsableProfile()
    {
        CreateMap<Responsable, ResponsableDto>()
            .ForCtorParam("id", opt => opt.MapFrom(src => src.idUt))
            .ForCtorParam("nom", opt => opt.MapFrom(src => src.nom))
            .ForCtorParam("prenom", opt => opt.MapFrom(src => src.prenom))
            .ForCtorParam("phone", opt => opt.MapFrom(src => src.telephone))
            .ForCtorParam("fonction", opt => opt.MapFrom(src => src.fonction));

        CreateMap<CreateResponsableDto, Responsable>()
            .ForMember(dest => dest.nom, opt => opt.MapFrom(src => src.nom))
            .ForMember(dest => dest.prenom, opt => opt.MapFrom(src => src.prenom))
            .ForMember(dest => dest.telephone, opt => opt.MapFrom(src => src.phone))
            .ForMember(dest => dest.fonction, opt => opt.MapFrom(src => src.fonction));

        CreateMap<UpdateResponsableDto, Responsable>()
            .ForMember(dest => dest.nom, opt => opt.MapFrom(src => src.nom))
            .ForMember(dest => dest.prenom, opt => opt.MapFrom(src => src.prenom))
            .ForMember(dest => dest.telephone, opt => opt.MapFrom(src => src.phone))
            .ForMember(dest => dest.fonction, opt => opt.MapFrom(src => src.fonction));
    }
}